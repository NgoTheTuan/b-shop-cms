import { useEffect, useState } from "react";
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
import { CategoryService } from "../../../network/categoryService";
import { CategoriesService } from "../../../network/categoriesService";

import { scrollToTop } from "../../../ultis/Ultis";

function CreateProduct() {
  const navigate = useNavigate();
  const [categoriesId, setCategoriesId] = useState();
  const [categoriesData, setCategoriesData] = useState();

  let initialValues = {
    title: "",
    categoriesId: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Không được để trống tên thể loại"),
    categoriesId: Yup.string().required("Không được để trống loại danh mục"),
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
        await CategoryService.create({
          title: values.title || "",
          categoriesId: values.categoriesId || 0,
        }).then((res) => {
          if (res) {
            toast.success("Thêm mới thành công!");
            scrollToTop();
            navigate("/category");
          } else {
            toast.error("Thêm mới không thành công.");
          }
        });
      } catch {}
    },
  });

  useEffect(() => {
    const getDataCategories = async () => {
      try {
        await CategoriesService.getData().then((res) => {
          if (res.length > 0) {
            setCategoriesData(res);
          }
        });
      } catch (error) {}
    };
    getDataCategories();
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Thêm mới thể loại</H1>
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
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Danh mục <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
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
          <Button variant="contained" onClick={() => navigate("/category")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default CreateProduct;
