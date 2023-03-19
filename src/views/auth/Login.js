import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import {
  SocialIconButton,
  TextFieldWrapper,
} from "../../components/StyledComponents";
import FlexBox from "../../components/FlexBox";
import LightTextField from "../../components/LightTextField";
import { H1, H3, Paragraph, Small } from "../../components/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AuthAction from "../../store/actions/auth";
import { AuthService } from "../../network/authService";
import logo from "../../assets/logo.jpg";

function Login() {
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "admin@gmail.com",
    password: "123456",
    submit: null,
    remember: true,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await AuthService.login({
            email: values.email,
            password: values.password,
          }).then((res) => {
            if (res.success) {
              if (res?.user?.isAdmin) {
                if (res?.user?.status === 1) {
                  dispatch({
                    type: AuthAction.LOGIN,
                    payload: {
                      token: res.accessToken,
                      user: res.user,
                    },
                  });
                  toast.success("Đăng nhập thành công !");
                  navigate("/");
                } else {
                  toast.error("Tài khoản hiện đang bị khoá.");
                }
              } else {
                toast.error("Tài khoản hoặc mật khẩu không đúng.");
              }
            } else {
              toast.error("Tài khoản hoặc mật khẩu không đúng.");
            }
          });
        } catch {}
      },
    });
  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={120} mb={1}>
            <img src={logo} width="100%" alt="B Shop Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Đăng nhập vào B Shop
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Password
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
              </TextFieldWrapper>
            </FlexBox>

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              <Button fullWidth type="submit" variant="contained">
                Đăng nhập
              </Button>
            </Box>
          </form>
        </FlexBox>
      </Card>
    </FlexBox>
  );
}

export default Login;
