import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
import {
  Box,
  Grid,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  TextField,
} from "@mui/material";
import { H1, H4 } from "../../../components/Typography";
import { useNavigate } from "react-router-dom";
import { TransactionService } from "../../../network/transactionService";
import { number_to_price, scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transactionProduct, setTransactionProduct] = useState();

  useEffect(() => {
    const getDetailTransaction = async () => {
      try {
        await TransactionService.getDetail(id).then((res) => {
          if (res) {
            setTransactionProduct(res);
          }
        });
      } catch (error) {}
    };
    getDetailTransaction();
  }, []);

  const onSubmitStatus = async (status) => {
    try {
      await TransactionService.edit({
        paymentId: String(id),
        status: status,
      }).then((res) => {
        if (res) {
          toast.success("Cập nhật thành công!");
          scrollToTop();
          navigate("/transaction");
        } else {
          toast.error("Cập nhật không thành công.");
        }
      });
    } catch (error) {}
  };

  return (
    <WrapperPages>
      <H1 sx={{ padding: "20px 30px 50px" }}>Thông tin giao dịch</H1>

      <Grid container spacing={2} sx={{ marginBottom: "50px" }}>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Người giao dịch
            </H4>
            <p>: {transactionProduct?.name || ""}</p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Thanh toán
            </H4>
            <p>
              :{" "}
              {transactionProduct?.payment_type === "offline"
                ? "Thanh toán khi nhận hàng"
                : " Chuyển khoản " || ""}
            </p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Email
            </H4>
            <p>: {transactionProduct?.email || ""}</p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Số điện thoại
            </H4>
            <p>: {transactionProduct?.phone || ""}</p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Địa chỉ
            </H4>
            <p>: {transactionProduct?.adress || ""}</p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Ghi chú
            </H4>
            <p>: {transactionProduct?.note || ""}</p>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ paddingTop: "0px", paddingLeft: "16px" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <H4 sx={{ width: "200px", display: "flex", alignItems: "center" }}>
              Ngày tạo giao dịch
            </H4>
            <p>: {transactionProduct?.createdAt || ""}</p>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead sx={{ background: "#e5eaf2" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Hình ảnh
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Tên sản phẩm
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Giá
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Số lượng
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Tổng tiền
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactionProduct?.products?.length > 0 &&
              transactionProduct?.products?.map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell style={{ width: 30 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      <img
                        src={item.product_img}
                        alt="product"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="item" align="center">
                      {item.product_title}
                    </TableCell>

                    <TableCell style={{ width: 160 }} align="center">
                      {number_to_price(Number(item.product_price))}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {item.product_total}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {number_to_price(
                        Number(item.product_price * item.product_total)
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}

            {!(transactionProduct?.products?.length > 0) && (
              <TableRow style={{ height: 53 }}>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "30px 0",
          gap: "15px",
        }}
      >
        {transactionProduct?.status === 0 ? (
          <>
            <Button
              variant="contained"
              sx={{ color: "#fff" }}
              onClick={() => onSubmitStatus(1)}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ color: "#fff" }}
              onClick={() => onSubmitStatus(2)}
            >
              Từ chối
            </Button>
          </>
        ) : transactionProduct?.status === 1 ? (
          <Button variant="contained" sx={{ color: "#fff" }}>
            Đã Giao Dịch
          </Button>
        ) : (
          <Button variant="contained" color="error" sx={{ color: "#fff" }}>
            Đã Từ Chối Giao Dịch
          </Button>
        )}

        <Button variant="contained" onClick={() => navigate("/transaction")}>
          Huỷ
        </Button>
      </Box>
    </WrapperPages>
  );
}

export default EditTransaction;
