import WrapperPages from "../../../components/Wrapper";
import { Grid, styled, Box, Button, Divider } from "@mui/material";
import { H1, Paragraph } from "../../../components/Typography";
import { TextWrapper } from "../../../components/StyledComponents";
import { useNavigate } from "react-router-dom";
import { SettingService } from "../../../network/settingService";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LightTextField from "../../../components/LightTextField";
import toast from "react-hot-toast";

function EditSetting() {
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  let initialValues = {
    shopTitle: "",
    shopAdress: "",
    shopPhone: "",
    shopEmail: "",
    shopMap: "",
  };

  useEffect(() => {
    const getDataSetting = async () => {
      try {
        await SettingService.getData().then((res) => {
          if (res.success) {
            const setting = JSON.parse(res.data[0].section || "{}");
            values.shopTitle = setting?.shop_title || "";
            values.shopAdress = setting?.shop_address || "";
            values.shopPhone = setting?.shop_phone || "";
            values.shopEmail = setting?.shop_email || "";
            values.shopMap = setting?.shop_map || "";
            setSetting({
              id: res.data[0]._id,
            });
          }
        });
      } catch (error) {}
    };
    getDataSetting();
  }, []);

  const validationSchema = Yup.object().shape({
    shopEmail: Yup.string().email("Email không đúng định dạng."),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);

        try {
          await SettingService.update({
            id: setting?.id,
            data: {
              section: JSON.stringify({
                shop_title: values.shopTitle,
                shop_address: values.shopAdress,
                shop_phone: values.shopPhone,
                shop_email: values.shopEmail,
                shop_map: values.shopMap,
              }),
            },
          }).then((res) => {
            if (res.success) {
              toast.success("Cập nhật thành công!");
              navigate("/");
            } else {
              toast.error("Cập nhật không thành công.");
            }
          });
        } catch {}
      },
    });

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Chỉnh sửa cài đặt chung</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tiêu đề shop
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopTitle"
                type="shopTitle"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopTitle || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Địa chỉ shop
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopAdress"
                type="shopAdress"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopAdress || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Số điện thoại shop
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopPhone"
                type="shopPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopPhone || ""}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Email shop
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopEmail"
                type="shopEmail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopEmail || ""}
                error={Boolean(touched.shopEmail && errors.shopEmail)}
                helperText={touched.shopEmail && errors.shopEmail}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Bản đồ shop
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopMap"
                type="shopMap"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopMap || ""}
                sx={{ height: "150px" }}
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
            Cập nhật
          </Button>

          <Button variant="contained" onClick={() => navigate("/")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default EditSetting;
