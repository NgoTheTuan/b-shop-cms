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
import { NewsService } from "../../../network/newsService";
import { SettingService } from "../../../network/settingService";
import { convertFileToBase64, scrollToTop } from "../../../ultis/Ultis";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useSelector } from "react-redux";

function CreateNews() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (urlImgUpdate) {
        const news_description =
          (valueDescription &&
            draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
          null;
        console.log(news_description);
        console.log(values);
        try {
          await SettingService.uploadCoverImg(fileUpload).then(async (res) => {
            await NewsService.create({
              title: values.title || "",
              description: news_description || "",
              author: user?.username || "",
              image: res?.url || "",
            }).then((res) => {
              if (res) {
                toast.success("Thêm mới thành công!");
                scrollToTop();
                navigate("/news");
              } else {
                toast.error("Thêm mới không thành công.");
              }
            });
          });
        } catch {}
      }
    },
  });

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
        <H1 sx={{ padding: "20px 30px 50px" }}>Thêm mới tin tức</H1>
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
            Thêm
          </Button>

          <Button variant="contained" onClick={() => navigate("/news")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default CreateNews;
