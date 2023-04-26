import WrapperPages from "../../../components/Wrapper";
import { H1 } from "../../../components/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Box,
  Grid,
} from "@mui/material";

import TablePaginationActions from "../../../components/TablePaginationActions";
import { TransactionService } from "../../../network/transactionService";
import {
  number_to_price,
  scrollToTop,
  formatDateTime,
  convertStatusTransaction,
} from "../../../ultis/Ultis";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Transaction() {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // open mở confirm xác nhận xoá
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState();

  const getDataTransaction = async () => {
    try {
      await TransactionService.getData().then((res) => {
        if (res.length > 0) {
          setTransaction(
            res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
          setData(res);
          setTotalPages(Math.ceil(res.length / rowsPerPage));
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getDataTransaction();
  }, []);

  const handleChangePage = (page) => {
    setTransaction(
      data.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    );
    setPage(page - 1);
  };

  const deleteTransaction = async () => {
    try {
      await TransactionService.delete(idDelete).then((res) => {
        toast.success("Xoá thành công!");
        if (res) {
          getDataTransaction();
        }
        setOpen(false);
      });
    } catch (error) {}
  };

  const handleClickOpen = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterTransaction = async () => {
    try {
      await TransactionService.filter({
        nameFilter: filterText.trim(),
        status: status,
      }).then((res) => {
        setTransaction(
          res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        );
        setData(res);
        setTotalPages(Math.ceil(res.length / rowsPerPage));
      });
    } catch (error) {}
  };

  const openCreateTransaction = () => {
    navigate("/transaction/create-transaction");
  };

  const openEditTransaction = (id) => {
    scrollToTop();
    navigate(`/transaction/edit-transaction/${id}`);
  };

  return (
    <>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Giao dịch</H1>

        <Box
          sx={{
            padding: 2,
            "@media (md)": {
              padding: 4,
            },
            "@media (xs)": {
              padding: 1,
            },
            margin: "30px 0",
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <TextWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Tên người dùng
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="search"
                  onChange={(e) => setFilterText(e.target.value)}
                  value={filterText || ""}
                />
              </TextWrapper>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Trạng thái
                </Paragraph>
                <Select
                  fullWidth
                  id="demo-simple-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      borderRadius: "8px",
                      border: "2px solid #E5EAF2",
                    },
                  }}
                >
                  <MenuItem value={undefined}>Chọn trạng thái...</MenuItem>
                  <MenuItem value={0}>Đang Chờ</MenuItem>
                  <MenuItem value={1}>Đã Giao Dịch</MenuItem>
                  <MenuItem value={2}>Từ Chối Giao Dịch</MenuItem>
                </Select>
              </TextWrapper>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                "@media (md)": {
                  transform: "translateY(30%)",
                },
                "@media (xs)": {
                  transform: "translateY(0%)",
                },
                margin: "30px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" onClick={filterTransaction}>
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead sx={{ background: "#e5eaf2" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  STT
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Tên
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Thanh toán
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Giá
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Ngày tạo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Trạng thái
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transaction?.length > 0 &&
                transaction?.map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell style={{ width: 30 }} align="center">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="item" align="center">
                        {item.name}
                      </TableCell>
                      <TableCell component="th" scope="item" align="center">
                        {item.payment_type === "offline"
                          ? "Thanh toán khi nhận hàng"
                          : "Chuyển khoản"}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {number_to_price(Number(item.total_money))}
                      </TableCell>

                      <TableCell style={{ width: 200 }} align="center">
                        {formatDateTime(item.createdAt)}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {convertStatusTransaction(Number(item.status))}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => openEditTransaction(item?._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleClickOpen(item?._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!(transaction?.length > 0) && (
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
          sx={{ margin: "10px 0", display: "flex", justifyContent: "center" }}
        >
          <TablePaginationActions
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn chắc chắn muốn xoá giao dịch?"}
          </DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={deleteTransaction}>
              Xoá
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Huỷ
            </Button>
          </DialogActions>
        </Dialog>
      </WrapperPages>
    </>
  );
}

export default Transaction;
