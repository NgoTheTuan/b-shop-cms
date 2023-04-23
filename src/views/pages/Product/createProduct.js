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
import { SupplierService } from "../../../network/supplierService";
import { WarehouseService } from "../../../network/wareHouseService";
import { ProductService } from "../../../network/productService";
import { SettingService } from "../../../network/settingService";
import { convertFileToBase64, scrollToTop } from "../../../ultis/Ultis";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

function CreateProduct() {
  const [setting, setSetting] = useState();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const [categoryData, setCategoryData] = useState();
  const [supplierData, setSupplierData] = useState();
  const [wareHouseData, setWareHouseData] = useState();

  const [checkImg, setCheckImg] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [urlImgUpdate, setUrlImgUpdate] = useState("");

  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  let initialValues = {
    name: "",
    description: "",
    quantity: 0,
    price: undefined,
    discount: 0,
    categoryId: "",
    supplierId: "",
    wareHouseId: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không được để trống tên sản phẩm"),
    quantity: Yup.number().min(0, "Số lượng lớn hơn hoặc bằng 0"),
    price: Yup.number()
      .required("Không được để trống giá sản phẩm")
      .min(0, "Giá lớn hơn hoặc bằng 0"),
    discount: Yup.number()
      .min(0, "Giảm giá lớn hơn hoặc bằng 0")
      .max(99, "Giảm giá nhỏ hơn hoặc bằng 99"),
    categoryId: Yup.string().required("Không được để trống thể loại sản phẩm"),
    supplierId: Yup.string().required("Không được để trống nhà cung cấp"),
    wareHouseId: Yup.string().required("Không được để trống nhà kho"),
    image: Yup.string().required("Chọn hình ảnh cho sản phẩm"),
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
        const product_description =
          (valueDescription &&
            draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
          null;

        try {
          await WarehouseService.changeQuantity({
            wareHouseId: values.wareHouseId || 0,
            quantity: Number(values.quantity) || 0,
          }).then(async (resWareHouse) => {
            if (resWareHouse?.success) {
              await SettingService.uploadCoverImg(fileUpload).then(
                async (res) => {
                  await ProductService.create({
                    name: values.name || "",
                    description: product_description || "",
                    quantity: Number(values.quantity) || 0,
                    price: Number(values.price) || 0,
                    discount: Number(values.discount) || 0,
                    image: res?.url || "",
                    categoryId: values.categoryId || 0,
                    supplierId: values.supplierId || 0,
                    wareHouseId: values.wareHouseId || 0,
                  }).then(async (res) => {
                    if (res) {
                      toast.success("Thêm mới thành công!");
                      scrollToTop();
                      navigate("/product");
                    } else {
                      toast.error("Thêm mới không thành công.");
                    }
                  });
                }
              );
            } else {
              toast.success(resWareHouse?.message);
            }
          });
        } catch {}
      }
    },
  });

  useEffect(() => {
    const getDataCategory = async () => {
      try {
        await CategoryService.getData().then((res) => {
          if (res.length > 0) {
            setCategoryData(res);
          }
        });
      } catch (error) {}
    };
    getDataCategory();
    const getDataSupplier = async () => {
      try {
        await SupplierService.filter({
          companyFilter: "",
          status: 1,
        }).then((res) => {
          if (res.length > 0) {
            setSupplierData(res);
          }
        });
      } catch (error) {}
    };
    getDataSupplier();
    const getDataWareHouse = async () => {
      try {
        await WarehouseService.filter({
          nameFilter: "",
          status: 1,
        }).then((res) => {
          if (res.length > 0) {
            setWareHouseData(res);
          }
        });
      } catch (error) {}
    };
    getDataWareHouse();
  }, []);

  const handleFileUpload = (file) => {
    const files = file.target.files[0];
    setFileUpload(files);
    const base64 = convertFileToBase64(files);
    base64.then((res) => {
      setUrlImgUpdate(res);
      values.image = res;
      // setValues({image: res})
      setErrors({
        name: errors.name,
        description: errors.description,
        price: errors.price,
        discount: errors.discount,
        categoryId: errors.categoryId,
        image: null,
      });
    });
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
                Số lượng
              </Paragraph>

              <LightTextField
                fullWidth
                name="quantity"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.quantity && errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
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
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Nhà cung cấp <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                onChange={handleChange}
                name="supplierId"
                error={Boolean(touched.supplierId && errors.supplierId)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                {supplierData?.length > 0 &&
                  supplierData?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {item?.company}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.supplierId && errors.supplierId}
              </FormHelperText>
            </TextWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextWrapper>
              <Paragraph fontWeight={600} mb={1}>
                Nhà kho <span style={{ color: "red" }}>*</span>
              </Paragraph>
              <Select
                fullWidth
                id="demo-simple-select"
                onChange={handleChange}
                name="wareHouseId"
                error={Boolean(touched.wareHouseId && errors.wareHouseId)}
                sx={{
                  "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px",
                    border: "2px solid #E5EAF2",
                  },
                }}
              >
                {wareHouseData?.length > 0 &&
                  wareHouseData?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText error sx={{ margin: "3px 14px 0 14px" }}>
                {touched.wareHouseId && errors.wareHouseId}
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
              {touched.categoryId && errors.image}
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

          <Button variant="contained" onClick={() => navigate("/product")}>
            Huỷ
          </Button>
        </Box>
      </WrapperPages>
    </form>
  );
}

export default CreateProduct;
