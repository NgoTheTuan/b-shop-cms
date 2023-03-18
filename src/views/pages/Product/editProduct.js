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
import { CategorySevice } from "../../../network/categoryService";
import { ProductSevice } from "../../../network/productService";
import { SettingSevice } from "../../../network/settingService";
import {
  convertFileToBase64,
  scrollToTop,
  htmlToDraftUtil,
} from "../../../ultis/Ultis";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";
import { UploadFile } from "@mui/icons-material";

function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const [categoryData, setCategoryData] = useState();
  const [status, setStatus] = useState();

  const [checkImg, setCheckImg] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  let initialValues = {
    name: "",
    description: "",
    price: undefined,
    discount: 0,
    categoryId: "",
    image: "",
    status: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không được để trống tên sản phẩm"),
    price: Yup.number()
      .required("Không được để trống giá sản phẩm")
      .min(0, "Giá lớn hơn hoặc bằng 0"),
    discount: Yup.number()
      .min(0, "Giảm giá lớn hơn hoặc bằng 0")
      .max(99, "Giảm giá nhỏ hơn hoặc bằng 99"),
    categoryId: Yup.string().required("Không được để trống thể loại sản phẩm"),
    image: Yup.string().required("Chọn hình ảnh cho sản phẩm"),
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
      console.log(values);
      const product_description =
        (valueDescription &&
          draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
        null;

      try {
        if (fileUpload) {
          await SettingSevice.uploadCoverImg(fileUpload).then(async (res) => {
            await ProductSevice.edit({
              productId: String(id),
              name: values.name || "",
              description: product_description || "",
              price: Number(values.price) || 0,
              discount: Number(values.discount) || 0,
              image: res?.url || "",
              categoryId: values.categoryId || 0,
              status: values.status,
            }).then((res) => {
              if (res) {
                toast.success("Cập nhật thành công!");
                scrollToTop();
                navigate("/product");
              } else {
                toast.error("Cập nhật không thành công.");
              }
            });
          });
        } else {
          await ProductSevice.edit({
            productId: String(id),
            name: values.name || "",
            description: product_description || "",
            price: Number(values.price) || 0,
            discount: Number(values.discount) || 0,
            image: values?.image || "",
            categoryId: values.categoryId || 0,
            status: values.status,
          }).then((res) => {
            if (res) {
              toast.success("Cập nhật thành công!");
              scrollToTop();
              navigate("/product");
            } else {
              toast.error("Cập nhật không thành công.");
            }
          });
        }
      } catch {}
    },
  });

  useEffect(() => {
    const getDataCategory = async () => {
      try {
        if (id) {
          await CategorySevice.getData(id).then((res) => {
            if (res.length > 0) {
              setCategoryData(res);
            }
          });
        }
      } catch (error) {}
    };
    const getDetailProduct = async () => {
      try {
        await ProductSevice.getDetail(id).then((res) => {
          if (res) {
            // setProduct(res);
            // setUrlImgUpdate(res?.image || "");
            setValueDescription(htmlToDraftUtil(res?.description || " "));
            setValues({
              name: res?.name || "",
              description: res?.description || "",
              price: res?.price || "",
              discount: res?.discount || "",
              categoryId: res?.categoryId || "",
              status: res?.status || "",
              image: res?.image || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailProduct();
    getDataCategory();
  }, []);

  const handleFileUpload = (file) => {
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
      values.image = res;
      setErrors({
        name: errors.name,
        description: errors.description,
        price: errors.price,
        discount: errors.discount,
        categoryId: errors.categoryId,
        status: errors.status,
        image: null,
      });
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa sản phẩm</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên sản phẩm <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="name"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                value={values?.name || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Mô tả
              </Paragraph>

              <Editor
                editorState={valueDescription}
                onEditorStateChange={(data) => setValueDescription(data)}
                name="description"
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Giá <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="price"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                value={values?.price}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Giảm giá
              </Paragraph>
              <LightTextField
                fullWidth
                name="discount"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.discount && errors.discount)}
                helperText={touched.discount && errors.discount}
                value={values?.discount}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Thể loại sản phẩm <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                value={values?.categoryId || 0}
                onChange={handleChange}
                name="categoryId"
                error={Boolean(touched.categoryId && errors.categoryId)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                {categoryData?.length > 0 &&
                  categoryData?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {item?.title}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.categoryId && errors.categoryId}
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

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <img
                src={urlImgUpdate || values?.image}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              <div style={{ padding: "30px" }}>
                <Button
                  variant="contained"
                  component="label"
                  onChange={handleFileUpload}
                >
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </div>
            </Box>

            <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
              {touched.categoryId && errors.image}
            </FormHelperText>
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

export default EditProduct;
