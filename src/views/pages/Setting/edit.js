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

import {
  convertFileToBase64,
  scrollToTop,
  htmlToDraftUtil,
} from "../../../ultis/Ultis";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

function EditSetting() {
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [valueContact, setValueContact] = useState(EditorState.createEmpty());
  let initialValues = {
    shopTitle: "",
    shopAdress: "",
    shopPhone: "",
    shopEmail: "",
    shopMap: "",
    shopShip: 0,
    shopBank: "",
    shopBankName: "",
    shopAccountNumber: "",
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
            values.shopShip = setting?.shop_ship || 0;
            values.shopMap = setting?.shop_map || "";
            values.shopBank = setting?.shop_bank || "";
            values.shopBankName = setting?.shop_bankName || "";
            values.shopAccountNumber = setting?.shop_accountNumber || "";

            setValueContact(htmlToDraftUtil(setting?.shop_contact || " "));

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
        const contact =
          (valueContact &&
            draftToHtml(convertToRaw(valueContact?.getCurrentContent()))) ||
          null;

        try {
          await SettingService.update({
            id: setting?.id,
            data: {
              section: JSON.stringify({
                shop_title: values.shopTitle,
                shop_address: values.shopAdress,
                shop_phone: values.shopPhone,
                shop_email: values.shopEmail,
                shop_bank: values.shopBank,
                shop_accountNumber: values.shopAccountNumber,
                shop_bankName: values.shopBankName,
                shop_ship: values.shopShip,
                shop_map: values.shopMap,
                shop_contact: contact || "",
              }),
            },
          }).then((res) => {
            if (res.success) {
              toast.success("Cập nhật thành công!");
              navigate("/setting");
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
                Phí Ship
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopShip"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopShip || ""}
                error={Boolean(touched.shopShip && errors.shopShip)}
                helperText={touched.shopShip && errors.shopShip}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Ngăn hàng
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopBank"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopBank || ""}
                error={Boolean(touched.shopShip && errors.shopBank)}
                helperText={touched.shopBank && errors.shopBank}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Số tài khoản
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopAccountNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopAccountNumber || ""}
                error={Boolean(
                  touched.shopAccountNumber && errors.shopAccountNumber
                )}
                helperText={
                  touched.shopAccountNumber && errors.shopAccountNumber
                }
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Chủ tài khoản
              </Paragraph>
              <LightTextField
                fullWidth
                name="shopBankName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shopBankName || ""}
                error={Boolean(touched.shopBankName && errors.shopBankName)}
                helperText={touched.shopBankName && errors.shopBankName}
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
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Giới thiệu
              </Paragraph>
              <Editor
                editorState={valueContact}
                onEditorStateChange={(data) => setValueContact(data)}
                name="description"
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
