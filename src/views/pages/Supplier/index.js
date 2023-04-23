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
import { SupplierService } from "../../../network/supplierService";
import {
  convertStatusSupplier as convertStatus,
  scrollToTop,
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

function Supplier() {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // open mở confirm xác nhận xoá
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState();

  const getDataSupplier = async () => {
    try {
      await SupplierService.getData().then((res) => {
        if (res.length > 0) {
          setSupplier(
            res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
          setData(res);
          setTotalPages(Math.ceil(res.length / rowsPerPage));
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getDataSupplier();
  }, []);

  const handleChangePage = (page) => {
    setSupplier(
      data.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    );
    setPage(page - 1);
  };

  const deleteNews = async () => {
    try {
      await SupplierService.delete(idDelete).then((res) => {
        toast.success("Xoá thành công!");
        if (res) {
          getDataSupplier();
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

  const filterNews = async () => {
    try {
      await SupplierService.filter({
        companyFilter: filterText.trim(),
        status: status,
      }).then((res) => {
        setSupplier(
          res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        );
        setData(res);
        setTotalPages(Math.ceil(res.length / rowsPerPage));
      });
    } catch (error) {}
  };

  const openCreateNews = () => {
    navigate("/supplier/create-supplier");
  };

  const openEditNews = (id) => {
    scrollToTop();
    navigate(`/supplier/edit-supplier/${id}`);
  };

  return (
    <>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Nhà cung cấp</H1>

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
                  Tên công ty
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
                  <MenuItem value={1}>Cung cấp</MenuItem>
                  <MenuItem value={0}>Dừng cung cấp</MenuItem>
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
              <Button variant="contained" onClick={filterNews}>
                Tìm kiếm
              </Button>

              <Button variant="contained" onClick={openCreateNews}>
                Thêm
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
                  Tên công ty
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Địa chỉ
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Số điện thoại
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Email
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
              {supplier?.length > 0 &&
                supplier?.map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell style={{ width: 30 }} align="center">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="item" align="center">
                        {item.company}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {item.address}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {item.phone}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {item.email}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {convertStatus(Number(item.status))}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => openEditNews(item?._id)}
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

              {!(supplier?.length > 0) && (
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
            {"Bạn chắc chắn muốn xoá sản phẩm?"}
          </DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={deleteNews}>
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

export default Supplier;
