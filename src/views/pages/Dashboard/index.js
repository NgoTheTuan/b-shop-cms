import { TransactionService } from "../../../network/transactionService";
import { useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import BucketIcon from "../../../components/icons/BucketIcon";
import EarningIcon from "../../../components/icons/EarningIcon";
import PeopleIcon from "../../../components/icons/PeopleIcon";
import WindowsLogoIcon from "../../../components/icons/WindowsLogoIcon";
import SaaSCard from "../../../components/Card";
import TotalSpent from "./TotalSpent";
import Analytics from "./Analytics";

function Dashboard() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [dataTransactionStatus, setDataTransactionStatus] = useState([]);
  const [totalOrderStatus, setTotalOrderStatus] = useState(0);

  const getDataTransactionSale = async () => {
    try {
      await TransactionService.getSalesStatic().then((res) => {
        if (res) {
          setDataTransaction(res);
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
          <TotalSpent
            dataChart={dataTransaction?.totalMonth || []}
            totalMoney={dataTransaction?.totalMoney || 0}
          />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics
            dataStatus={dataTransactionStatus}
            totalOrder={totalOrderStatus}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
