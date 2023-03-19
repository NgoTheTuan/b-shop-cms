import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
import { Box, Grid, Button } from "@mui/material";
import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph, H1 } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../ultis/Ultis";
import { CategoriesService } from "../../../network/categoriesService";

function CreateCategories() {
  const navigate = useNavigate();

  let initialValues = {
    title: "",
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
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await CategoriesService.create({
          title: values.title || "",
        }).then((res) => {
          if (res) {
            toast.success("Thêm mới thành công!");
            scrollToTop();
            navigate("/categories");
          } else {
            toast.error("Thêm mới không thành công.");
          }
        });
      } catch {}
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Thêm mới danh mục</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên danh mục<span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="title"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
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
            Thêm
          </Button>
          <Button variant="contained" onClick={() => navigate("/categories")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default CreateCategories;
