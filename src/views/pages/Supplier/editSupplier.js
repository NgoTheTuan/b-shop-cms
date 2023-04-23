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
import { SupplierService } from "../../../network/supplierService";
import { scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState();

  let initialValues = {
    company: "",
    address: "",
    phone: "",
    email: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("Không được để trống tiêu đề tin tức"),
    address: Yup.string().required("Không được để trống tiêu đề tin tức"),
    phone: Yup.string().required("Không được để trống tiêu đề tin tức"),
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .required("Không được để trống email"),
  });

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
        await SupplierService.edit({
          supplierId: String(id),
          company: values?.company || "",
          address: values?.address || "",
          phone: values?.phone || "",
          email: values?.email || "",
          status: values?.status || 1,
        }).then((res) => {
          if (res) {
            toast.success("Cập nhật thành công!");
            scrollToTop();
            navigate("/supplier");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      } catch {}
    },
  });

  useEffect(() => {
    const getDetailSupplier = async () => {
      try {
        await SupplierService.getDetail(id).then((res) => {
          if (res) {
            setValues({
              company: res?.company || "",
              address: res?.address || "",
              phone: res?.phone || "",
              email: res?.email || "",
              status: res?.status || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailSupplier();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa Thể loại</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên công ty <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="company"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
                value={values?.company || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Địa chỉ <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="address"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                value={values?.address || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="phone"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                value={values?.phone || ""}
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
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
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
                <MenuItem value={1}>Cung cấp</MenuItem>
                <MenuItem value={0}>Dừng cung cấp</MenuItem>
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
          <Button variant="contained" onClick={() => navigate("/supplier")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditSupplier;
