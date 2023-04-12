import { TransactionService } from "../../../network/transactionService";
import { useEffect, useState } from "react";
import { Box, Grid, useTheme, Switch, Card } from "@mui/material";
import BucketIcon from "../../../components/icons/BucketIcon";
import EarningIcon from "../../../components/icons/EarningIcon";
import PeopleIcon from "../../../components/icons/PeopleIcon";
import WindowsLogoIcon from "../../../components/icons/WindowsLogoIcon";
import SaaSCard from "../../../components/Card";
import TotalSpent from "./TotalSpent";
import Analytics from "./Analytics";
import RecentOrders from "./RecentOrders";
import TopSelling from "./TopSelling";

function Dashboard() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [checked, setChecked] = useState(false);
  const [dataTransaction, setDataTransaction] = useState([]);

  const [dataTransactionDay, setDataTransactionDay] = useState([]);
  const [dataTransactionDayItem, setDataTransactionDayItem] = useState([]);

  const [dataTransactionStatus, setDataTransactionStatus] = useState([]);
  const [totalOrderStatus, setTotalOrderStatus] = useState(0);

  const month = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const getDataTransactionSale = async () => {
    try {
      await TransactionService.getSalesStatic().then((res) => {
        if (res) {
          setDataTransaction(res);
          if (res?.totalDay?.length > 0) {
            let day = [];
            let dayItem = [];
            res?.totalDay.forEach((resDay) => {
              day.push(resDay?.total || 0);
              dayItem.push(resDay?.date || "");
            });
            setDataTransactionDay(day);
            setDataTransactionDayItem(dayItem);
          }
        }
      });
      await TransactionService.getSalesStaticStatus().then((res) => {
        if (res) {
          setTotalOrderStatus(res?.totalOrder || 0);
          setDataTransactionStatus([
            ((res?.totalStatus?.paid / res?.totalOrder) * 100).toFixed(0) || 0,
            ((res?.totalStatus?.pending / res?.totalOrder) * 100).toFixed(0) ||
              0,
            ((res?.totalStatus?.failed / res?.totalOrder) * 100).toFixed(0) ||
              0,
          ]);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getDataTransactionSale();
  }, []);

  const theme = useTheme();

  const cardList = [
    {
      price: dataTransaction?.totalMoney || 0,
      Icon: BucketIcon,
      title: "Tổng thu nhập",
      color: theme.palette.primary.main,
      money: true,
    },
    {
      price: dataTransaction?.totalProduct || 0,
      title: "Tổng sản phẩm đã bán",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
      money: false,
    },
    {
      price: dataTransaction?.totalOrder || 0,
      Icon: WindowsLogoIcon,
      title: "Tổng đơn hàng",
      color: theme.palette.primary.red,
      money: false,
    },
    {
      price: dataTransaction?.totalUser || 0,
      Icon: PeopleIcon,
      title: "Tổng người mua",
      color: theme.palette.primary.yellow,
      money: false,
    },
  ];

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {cardList.map((card, index) => (
          <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <Card
            sx={{
              paddingX: 4,
              height: "100%",
              paddingBottom: "1.5rem",
              paddingTop: "calc(1.5rem + 15px)",
              [theme.breakpoints.down(425)]: { padding: "1.5rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              Ngày{" "}
              <Switch {...label} checked={checked} onChange={handleChange} />{" "}
              Tháng
            </Box>
            {checked ? (
              <TotalSpent
                dataItem={month}
                dataChart={dataTransaction?.totalMonth || []}
                totalMoney={dataTransaction?.totalMoney || 0}
              />
            ) : (
              <TotalSpent
                dataItem={dataTransactionDayItem || []}
                dataChart={dataTransactionDay || []}
                totalMoney={dataTransaction?.totalMoney || 0}
              />
            )}
          </Card>
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics
            dataStatus={dataTransactionStatus}
            totalOrder={totalOrderStatus}
          />
        </Grid>
        <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
