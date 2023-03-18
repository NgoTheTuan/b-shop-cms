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
import { convertFileToBase64 } from "../../../ultis/Ultis";
import { SettingSevice } from "../../../network/settingService";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

function CreateProduct() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const [categoryData, setCategoryData] = useState();

  const [checkImg, setCheckImg] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  let initialValues = {
    name: "",
    description: "",
    price: undefined,
    discount: 0,
    categoryId: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không được để trống tên sản phẩm"),
    description: Yup.string().required("Không được để trống mô tả sản phẩm"),
    price: Yup.number()
      .required("Không được để trống giá sản phẩm")
      .min(0, "Giảm giá lớn hơn hoặc bằng 0"),
    discount: Yup.number()
      .min(0, "Giảm giá lớn hơn hoặc bằng 0")
      .max(99, "Giảm giá nhỏ hơn hoặc bằng 99"),
    categoryId: Yup.string().required("Không được để trống thể loại sản phẩm"),
    image: Yup.string().required("Chọn hình ảnh cho sản phẩm"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        if (urlImgUpdate) {
          console.log(values);
          console.log(categoryId);
        }
        // try {
        //   await SettingSevice.update({
        //     id: setting?.id,
        //     data: {
        //       section: JSON.stringify({
        //         shop_title: values.shopTitle,
        //         shop_address: values.shopAdress,
        //         shop_phone: values.shopPhone,
        //         shop_email: values.shopEmail,
        //         shop_map: values.shopMap,
        //       }),
        //     },
        //   }).then((res) => {
        //     if (res.success) {
        //       toast.success("Cập nhật thành công!");
        //       navigate("/");
        //     } else {
        //       toast.error("Cập nhật không thành công.");
        //     }
        //   });
        // } catch {}
      },
    });

  useEffect(() => {
    const getDataCategory = async () => {
      try {
        await CategorySevice.getData().then((res) => {
          if (res.length > 0) {
            setCategoryData(res);
          }
        });
      } catch (error) {}
    };
    getDataCategory();
  }, []);

  const handleFileUpload = (file) => {
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
      values.image = res;
      errors.image = "";
    });
  };

  const uploadCoverImg = async () => {
    try {
      await SettingSevice.uploadCoverImg(fileUpload).then(async (res) => {
        await SettingSevice.update({
          id: setting?.id,
          data: {
            cover_image: res?.url,
          },
        }).then((res) => {
          if (res.success) {
            toast.success("Cập nhật thành công!");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      });
    } catch (error) {}
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Thêm mới sản phẩm</H1>
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
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Mô tả <span style={{ color: "red" }}>*</span>
              </Paragraph>
              {/* <LightTextField
                fullWidth
                name="description"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              /> */}

              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />

              <small className="text-danger">
                {errors?.description && errors.description}
              </small>
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
            <Box sx={{ display: "flex" }}>
              <img
                src={urlImgUpdate || ""}
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
              {errors.image}
            </FormHelperText>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px 0",
          }}
        >
          <Button type="submit" variant="contained">
            Thêm
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default CreateProduct;
