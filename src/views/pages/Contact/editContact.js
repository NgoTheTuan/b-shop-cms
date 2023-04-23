import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
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
  Button,
} from "@mui/material";

import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph, H1 } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";

import { ContactService } from "../../../network/contactService";

import { scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditContact() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [categoriesId, setCategoriesId] = useState();
  const [categoriesData, setCategoriesData] = useState();
  const [status, setStatus] = useState();

  let initialValues = {
    email: "",
    name: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({});

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setErrors,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await ContactService.edit({
          contactId: String(id),
          status: values.status,
        }).then((res) => {
          if (res) {
            toast.success("Cập nhật thành công!");
            scrollToTop();
            navigate("/contact");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      } catch {}
    },
  });

  useEffect(() => {
    const getDetailContact = async () => {
      try {
        await ContactService.getDetail(id).then((res) => {
          if (res) {
            setValues({
              email: res?.email || "",
              name: res?.name || "",
              status: res?.status || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailContact();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa Liên Hệ</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Họ và Tên <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="name"
                type="text"
                disabled
                value={values?.name || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Email <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="email"
                type="text"
                disabled
                value={values?.email || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Trạng Thái
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                value={String(values?.status) || "0"}
                onChange={handleChange}
                name="status"
                error={Boolean(touched.status && errors.status)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                <MenuItem value={1}>Đã liên hệ</MenuItem>
                <MenuItem value={0}>Chưa liên hệ</MenuItem>
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.status && errors.status}
              </FormHelperText>
            </TextWrapper>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px 0",
            gap: "15px",
          }}
        >
          <Button type="submit" variant="contained">
            Cập nhật
          </Button>
          <Button variant="contained" onClick={() => navigate("/contact")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditContact;
