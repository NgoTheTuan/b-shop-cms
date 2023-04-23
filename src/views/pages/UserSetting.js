import { Box, Button, Card, Grid, styled } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import LightTextField from "../../components/LightTextField";
import WrapperPages from "../../components/Wrapper";

import { H1, Paragraph } from "../../components/Typography";
import { TextWrapper } from "../../components/StyledComponents";
import { AuthService } from "../../network/authService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const Wrapper = styled(Box)(({ theme }) => ({
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

function UserSetting() {
  const user = useSelector((state) => state?.auth);
  let navigate = useNavigate();

  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu phải lớn hơn 6 kí tự")
      .required("Không được bỏ trống mật khẩu!"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải lớn hơn 6 kí tự")
      .required("Không được bỏ trống mật khẩu mới!"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Nhập lại mật khẩu không khớp")
      .required("Không được bỏ trống mật khẩu nhập lại!"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await AuthService.changePassword({
            userId: user?._id,
            password: values?.password.trim(),
            newPassword: values?.newPassword.trim(),
          }).then((res) => {
            if (res.success) {
              toast.success("Đổi mật khẩu thành công thành công !");
              navigate("/");
            } else {
              toast.error("Mật khẩu không chính xác không đúng.");
            }
          });
        } catch {}
      },
    });

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Đổi mật khẩu</H1>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Mật khẩu cũ
              </Paragraph>
              <LightTextField
                fullWidth
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </TextWrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Mật khẩu mới
              </Paragraph>
              <LightTextField
                fullWidth
                name="newPassword"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword || ""}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
            </TextWrapper>

            <TextWrapper sx={{ marginTop: "30px" }}>
              <Paragraph fontWeight={600} mb={1}>
                Nhập lại Mật khẩu
              </Paragraph>
              <LightTextField
                fullWidth
                name="confirmNewPassword"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmNewPassword || ""}
                error={Boolean(
                  touched.confirmNewPassword && errors.confirmNewPassword
                )}
                helperText={
                  touched.confirmNewPassword && errors.confirmNewPassword
                }
              />
            </TextWrapper>
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
            Đổi mật khẩu
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default UserSetting;
