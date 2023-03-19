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
import { CategoryService } from "../../../network/categoryService";
import { CategoriesService } from "../../../network/categoriesService";
import { scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditCategory() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [categoriesId, setCategoriesId] = useState();
  const [categoriesData, setCategoriesData] = useState();
  const [status, setStatus] = useState();

  let initialValues = {
    title: "",
    categoriesId: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Không được để trống tên thể loại"),
    categoriesId: Yup.string().required("Không được để trống danh mục"),
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
        await CategoryService.edit({
          categoryProductId: String(id),
          title: values.title || "",
          categoriesId: values.categoriesId || 0,
          status: values.status,
        }).then((res) => {
          if (res) {
            toast.success("Cập nhật thành công!");
            scrollToTop();
            navigate("/category");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      } catch {}
    },
  });

  useEffect(() => {
    const getDataCategories = async () => {
      try {
        if (id) {
          await CategoriesService.getData().then((res) => {
            if (res.length > 0) {
              setCategoriesData(res);
            }
          });
        }
      } catch (error) {}
    };
    const getDetailCategory = async () => {
      try {
        await CategoryService.getDetail(id).then((res) => {
          if (res) {
            setValues({
              title: res?.title || "",
              categoriesId: res?.categoriesId || "",
              status: res?.status || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailCategory();
    getDataCategories();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa Thể loại</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên thể loại <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="title"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                value={values?.title || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Danh mục sản phẩm <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                value={values?.categoriesId || 0}
                onChange={handleChange}
                name="categoriesId"
                error={Boolean(touched.categoriesId && errors.categoriesId)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                {categoriesData?.length > 0 &&
                  categoriesData?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {item?.title}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.categoriesId && errors.categoriesId}
              </FormHelperText>
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
                <MenuItem value={1}>Hoạt động</MenuItem>
                <MenuItem value={0}>Khoá</MenuItem>
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
          <Button variant="contained" onClick={() => navigate("/product")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditCategory;
