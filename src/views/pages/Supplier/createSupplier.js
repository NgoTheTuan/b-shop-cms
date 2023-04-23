import toast from "react-hot-toast";
import WrapperPages from "../../../components/Wrapper";
import { Box, Grid, Button } from "@mui/material";
import { TextWrapper } from "../../../components/StyledComponents";
import { Paragraph, H1 } from "../../../components/Typography";
import LightTextField from "../../../components/LightTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { SupplierService } from "../../../network/supplierService";
import { scrollToTop } from "../../../ultis/Ultis";

function CreateSupplier() {
  const navigate = useNavigate();

  let initialValues = {
    company: "",
    address: "",
    phone: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("Không được để trống tiêu đề tin tức"),
    address: Yup.string().required("Không được để trống tiêu đề tin tức"),
    phone: Yup.string().required("Không được để trống tiêu đề tin tức"),
    email: Yup.string()
      .email("Phải là một email hợp lệ")
      .required("Không được để trống email"),
  });

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await SupplierService.create({
            company: values?.company,
            address: values?.address,
            phone: values?.phone,
            email: values?.email,
          }).then((res) => {
            if (res) {
              toast.success("Thêm mới thành công!");
              scrollToTop();
              navigate("/supplier");
            } else {
              toast.error("Thêm mới không thành công.");
            }
          });
        } catch {}
      },
    }
  );

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
      <WrapperPages>
        <H1 sx={{ padding: "20px 30px 50px" }}>Thêm mới nhà cung cấp</H1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Tên công ty <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="company"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Địa chỉ <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="address"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="phone"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Email <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <LightTextField
                fullWidth
                name="email"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
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

export default CreateSupplier;
