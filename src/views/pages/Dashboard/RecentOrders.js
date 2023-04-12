import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { H5, Small } from "../../../components/Typography";
import { number_to_price } from "../../../ultis/Ultis";
import { TransactionService } from "../../../network/transactionService";
import { useEffect, useState } from "react";

const commonCSS = {
  minWidth: 120,
  "&:nth-of-type(2)": { minWidth: 170 },
  "&:nth-of-type(3)": { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: "1rem",
  paddingTop: "0.7rem",
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
  [theme.breakpoints.down("sm")]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

const RecentOrders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      await TransactionService.getDataLatest().then((res) => {
        if (res?.length > 0) {
          let dataProduct = [];
          res.forEach((element) => {
            dataProduct.push(...(element?.products || {}));
          });
          setData(dataProduct);
        }
      });
    })();
  }, []);

  return (
    <Card sx={{ padding: "2rem" }}>
      <H5>Sản phẩm bán gần đây</H5>

      <Table>
        <TableHead sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}>
          <TableRow>
            <HeadTableCell>STT</HeadTableCell>
            <HeadTableCell>Tên sản phẩm</HeadTableCell>
            <HeadTableCell>Giá</HeadTableCell>
            <HeadTableCell>Số lượng</HeadTableCell>
            <HeadTableCell>Tổng tiền</HeadTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 &&
            data.map((item, index) => (
              <TableRow key={index}>
                <BodyTableCell>{index + 1}</BodyTableCell>
                <BodyTableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.product_img}
                      alt="product title"
                      width="40px"
                    />
                    <Small ml="1rem">{item.product_title}</Small>
                  </Box>
                </BodyTableCell>
                <BodyTableCell>
                  {number_to_price(item.product_price)} đ
                </BodyTableCell>
                <BodyTableCell>
                  <Box
                    sx={{
                      backgroundColor: "secondary.200",
                      borderRadius: 11,
                      maxWidth: 55,
                      padding: "0.3rem",
                      textAlign: "center",
                      color: "secondary.400",
                    }}
                  >
                    {item.product_total}
                  </Box>
                </BodyTableCell>
                <BodyTableCell>
                  {number_to_price(
                    Number(item.product_total) * Number(item.product_price)
                  )}{" "}
                  đ
                </BodyTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentOrders;
