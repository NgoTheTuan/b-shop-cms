import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
import { Box, Grid, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph, H1 } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { SettingService } from "../../../network/settingService";
import { UserService } from "../../../network/userService";
import { convertFileToBase64, scrollToTop } from "../../../ultis/Ultis";
import { useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  let initialValues = {
    name: "",
    phone: "",
    address: "",
    image: "",
    status: "",
    isAdmin: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không được để trống tên người dùng"),
    image: Yup.string().required("Chọn hình ảnh cho tài khoản"),
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
      if (fileUpload) {
        await SettingService.uploadCoverImg(fileUpload).then(async (res) => {
          await UserService.edit({
            userId: id,
            username: values.name || "",
            avatar: res?.url || "",
            address: values.address || "",
            phone: values.phone || "",
            status: values.status,
            isAdmin: values.isAdmin,
          }).then((res) => {
            if (res) {
              toast.success("Cập nhật thành công!");
              scrollToTop();
              navigate("/user");
            } else {
              toast.error("Cập nhật không thành công.");
            }
          });
        });
      } else {
        await UserService.edit({
          userId: id,
          username: values.name || "",
          avatar: values.image || "",
          address: values.address || "",
          phone: values.phone || "",
          status: values.status,
          isAdmin: values.isAdmin,
        }).then((res) => {
          if (res) {
            toast.success("Cập nhật thành công!");
            scrollToTop();
            navigate("/user");
          } else {
            toast.error("Cập nhật không thành công.");
          }
        });
      }
    },
  });

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        await UserService.getDetail(id).then((res) => {
          if (res) {
            setValues({
              name: res?.username || "",
              phone: res?.phone || "",
              address: res?.address || "",
              image: res?.avatar || "",
              status: res?.status || "",
              isAdmin: res?.isAdmin || false,
            });
          }
        });
      } catch (error) {}
    };
    getDetailUser();
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
        password: errors.password,
        image: null,
      });
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa Tài khoản</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên người dùng <span style={{ color: "red" }}>*</span>
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
                Phone
              </Paragraph>
              <LightTextField
                fullWidth
                name="phone"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                value={values?.phone}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Địa chỉ
              </Paragraph>
              <LightTextField
                fullWidth
                name="address"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                value={values?.address}
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
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Chức năng
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                value={values?.isAdmin || false}
                onChange={handleChange}
                name="isAdmin"
                error={Boolean(touched.isAdmin && errors.isAdmin)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                <MenuItem value={true}>Admin</MenuItem>
                <MenuItem value={false}>User</MenuItem>
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.isAdmin && errors.isAdmin}
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
          <Button variant="contained" onClick={() => navigate("/user")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditUser;
