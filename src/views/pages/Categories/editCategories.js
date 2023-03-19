import { useEffect } from "react";
import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
import { Box, Grid, Button } from "@mui/material";
import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph, H1 } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { CategoriesService } from "../../../network/categoriesService";
import { scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditCategories() {
  const { id } = useParams();
  const navigate = useNavigate();

  let initialValues = {
    title: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Không được để trống tên danh mục")
      .min(3, "Tên danh mục phải lớn hơn 3 kí tự!"),
  });

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await CategoriesService.edit({
          categoriesId: String(id),
          title: values.title || "",
          status: values.status,
        }).then((res) => {
          if (res) {
            toast.success("Cập nhật thành công!");
            scrollToTop();
            navigate("/categories");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      } catch {}
    },
  });

  useEffect(() => {
    const getDetailCategories = async () => {
      try {
        await CategoriesService.getDetail(id).then((res) => {
          if (res) {
            setValues({
              title: res?.title || "",
              status: res?.status || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailCategories();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa danh mục</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên danh mục <span style={{ color: "red" }}>*</span>
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
          <Button variant="contained" onClick={() => navigate("/categories")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditCategories;
