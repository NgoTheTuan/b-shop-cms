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
import { ContactService } from "../../../network/contactService";
import {
  convertStatusContact as convertStatus,
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

function Contact() {
  const navigate = useNavigate();

  const [contact, setContact] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // open mở confirm xác nhận xoá
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState();

  const getDataContact = async () => {
    try {
      await ContactService.getData().then((res) => {
        if (res.length > 0) {
          setContact(
            res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
          setData(res);
          setTotalPages(Math.ceil(res.length / rowsPerPage));
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getDataContact();
  }, []);

  const handleChangePage = (page) => {
    setContact(
      data.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    );
    setPage(page - 1);
  };

  const deleteCategory = async () => {
    try {
      await ContactService.delete(idDelete).then((res) => {
        toast.success("Xoá thành công!");
        if (res) {
          getDataContact();
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

  const filterCategory = async () => {
    try {
      await ContactService.filter({
        emailFilter: filterText.trim(),
        status: status,
      }).then((res) => {
        setContact(
          res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        );
        setData(res);
        setTotalPages(Math.ceil(res.length / rowsPerPage));
      });
    } catch (error) {}
  };

  const openEditCategory = (id) => {
    scrollToTop();
    navigate(`/contact/edit-contact/${id}`);
  };

  return (
    <>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Liên Hệ</H1>

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
                  Email
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
                  <MenuItem value={1}>Đã liên hệ</MenuItem>
                  <MenuItem value={0}>Chưa liên hệ</MenuItem>
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
              <Button variant="contained" onClick={filterCategory}>
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
                  Họ và Tên
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
              {contact?.length > 0 &&
                contact?.map((item, index) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell style={{ width: 30 }} align="center">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell component="th" scope="item" align="center">
                        {item.name || ""}
                      </TableCell>
                      <TableCell component="th" scope="item" align="center">
                        {item.email || ""}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {convertStatus(Number(item.status))}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Stack direction="row" spacing={1}>
                          {Number(item.status) === 0 && (
                            <IconButton
                              aria-label="delete"
                              color="primary"
                              onClick={() => openEditCategory(item?._id)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}

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

              {!(contact?.length > 0) && (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={4} sx={{ textAlign: "center" }}>
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
            <Button variant="contained" onClick={deleteCategory}>
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

export default Contact;
