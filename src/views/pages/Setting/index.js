import WrapperPages from "../../../components/Wrapper";
import { Grid, styled, Box, Button, Divider } from "@mui/material";
import { H1, Paragraph } from "../../../components/Typography";
import { TextWrapper } from "../../../components/StyledComponents";
import { Link } from "react-router-dom";
import { SettingService } from "../../../network/settingService";
import { useEffect, useState } from "react";
import { convertFileToBase64, number_to_price } from "../../../ultis/Ultis";
import toast from "react-hot-toast";

const TextInfo = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "50px",
  fontSize: 14,
  borderRadius: "6px",
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.divider,

  overflow: "auto",
}));

function Setting() {
  const [setting, setSetting] = useState();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  useEffect(() => {
    const getDataSetting = async () => {
      try {
        await SettingService.getData().then((res) => {
          if (res.success) {
            setSetting({
              id: res.data[0]._id,
              cover_image: res.data[0].cover_image,
              section: JSON.parse(res.data[0].section || {}),
            });
          }
        });
      } catch (error) {}
    };
    getDataSetting();
  }, []);

  const handleFileUpload = (file) => {
    setCheckUpdate(!checkUpdate);
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
    });
  };

  const cancelUpdate = () => {
    setUrlImgUpdate("");
    setCheckUpdate(false);
  };

  const uploadCoverImg = async () => {
    try {
      await SettingService.uploadCoverImg(fileUpload).then(async (res) => {
        await SettingService.update({
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
    <WrapperPages>
      <H1 sx={{ padding: "20px 30px 50px" }}>Cài đặt chung</H1>

      <Grid container spacing={1}>
        <Paragraph fontWeight={600} mb={1}>
          Ảnh bìa
        </Paragraph>
        <Grid item xs={12} sx={{ width: "100%", maxHeight: "500px" }}>
          {!checkUpdate ? (
            <img
              src={
                setting?.cover_image ||
                "https://res.cloudinary.com/dmrhenlws/image/upload/v1665718667/lrag9anqc6mnrflwylv0.png"
              }
              style={{ width: "100%", height: "100%" }}
              alt=""
            />
          ) : (
            <img
              src={
                urlImgUpdate ||
                "https://res.cloudinary.com/dmrhenlws/image/upload/v1665718667/lrag9anqc6mnrflwylv0.png"
              }
              style={{ width: "100%", height: "100%" }}
              alt=""
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {!checkUpdate ? (
            <Button
              variant="contained"
              component="label"
              onChange={handleFileUpload}
            >
              Thay đổi
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          ) : (
            <>
              <Button
                onClick={uploadCoverImg}
                variant="contained"
                sx={{ margin: "0 20px" }}
              >
                Cập Nhật
              </Button>
              <Button onClick={cancelUpdate} variant="contained" color="error">
                Huỷ bỏ
              </Button>
            </>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 1, margin: "50px 0" }} />

      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link to="/setting-update">
          <Button variant="contained">Cập nhật thông tin</Button>
        </Link>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Tiêu đề Shop
            </Paragraph>
            <TextInfo>{setting?.section?.shop_title || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Địa chỉ
            </Paragraph>
            <TextInfo>{setting?.section?.shop_address || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Số điện thoại
            </Paragraph>
            <TextInfo>{setting?.section?.shop_phone || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Email
            </Paragraph>
            <TextInfo>{setting?.section?.shop_email || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Ngân hàng
            </Paragraph>
            <TextInfo>{setting?.section?.shop_bank || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Số tài khoản
            </Paragraph>
            <TextInfo>{setting?.section?.shop_accountNumber || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Chủ tài khoản
            </Paragraph>
            <TextInfo>{setting?.section?.shop_bankName || ""}</TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Phí Ship
            </Paragraph>
            <TextInfo>
              {number_to_price(setting?.section?.shop_ship || 0)}đ
            </TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Bản đồ
            </Paragraph>
            <TextInfo sx={{ height: "120px" }}>
              {setting?.section?.shop_map || ""}
            </TextInfo>
          </TextWrapper>
        </Grid>

        <Grid item xs={12} sx={{ margin: "10px 0px" }}>
          <TextWrapper>
            <Paragraph fontWeight={600} mb={1}>
              Giới thiệu
            </Paragraph>
            <TextInfo sx={{ height: "400px" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: setting?.section?.shop_contact || "",
                }}
              ></span>
            </TextInfo>
          </TextWrapper>
        </Grid>
      </Grid>
    </WrapperPages>
  );
}

export default Setting;
