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
import { ProductService } from "../../../network/productService";
import { SettingService } from "../../../network/settingService";
import { NewsService } from "../../../network/newsService";
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

function EditNews() {
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
    title: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Không được để trống tiêu đề tin tức"),
    image: Yup.string().required("Chọn hình ảnh cho tin tức"),
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
      const news_description =
        (valueDescription &&
          draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
        null;

      try {
        if (fileUpload) {
          await SettingService.uploadCoverImg(fileUpload).then(async (res) => {
            await NewsService.edit({
              newsId: String(id),
              title: values.title || "",
              description: news_description || "",
              image: res?.url || "",
              status: values.status,
            }).then((res) => {
              if (res) {
                toast.success("Cập nhật thành công!");
                scrollToTop();
                navigate("/news");
              } else {
                toast.error("Cập nhật không thành công.");
              }
            });
          });
        } else {
          await NewsService.edit({
            newsId: String(id),
            title: values.title || "",
            description: news_description || "",
            image: values.image || "",
            status: values.status,
          }).then((res) => {
            if (res) {
              toast.success("Cập nhật thành công!");
              scrollToTop();
              navigate("/news");
            } else {
              toast.error("Cập nhật không thành công.");
            }
          });
        }
      } catch {}
    },
  });

  useEffect(() => {
    const getDetailNews = async () => {
      try {
        await NewsService.getDetail(id).then((res) => {
          if (res) {
            setValueDescription(htmlToDraftUtil(res?.description || " "));
            setValues({
              title: res?.title || "",
              description: res?.description || "",
              status: res?.status || "",
              image: res?.image || "",
            });
          }
        });
      } catch (error) {}
    };
    getDetailNews();
  }, []);

  const handleFileUpload = (file) => {
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
      values.image = res;
      setErrors({
        title: errors.title,
        description: errors.description,
        description: errors.description,
        image: null,
      });
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa tin tức</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tiêu đề <span style={{ color: "red" }}>*</span>
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
              {touched.image && errors.image}
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
          <Button variant="contained" onClick={() => navigate("/news")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditNews;
