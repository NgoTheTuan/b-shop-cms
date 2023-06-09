import Chip from "@mui/material/Chip";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import moment from "moment";

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const formatDateTime = (dateTime) => {
  let momentDate = moment(dateTime).utc().zone("UTC+09");
  return momentDate.format("YYYY-MM-DD HH:mm:ss");
};

export const number_to_price = (v) => {
  if (v === 0) {
    return "0";
  }

  if (!v || v === "") {
    return v;
  }
  v = v.toString();

  v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  v = v.split(",").join("*").split(".").join(",").split("*").join(".");
  return v;
};

export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export function convertBase64ToFile(dataurl) {
  return new Promise((resolve, reject) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], { type: mime }));
  });
}

export const convertStatus = (status) => {
  if (status === 1) {
    return (
      <Chip
        label="Hoạt động"
        color="success"
        sx={{
          color: "#28c76f",
          backgroundColor: "rgba(40,199,111,.22)",
          fontWeight: "600",
        }}
      />
    );
  } else if (status === 0) {
    return (
      <Chip
        label="Khoá"
        color="error"
        sx={{
          color: "#ea5455",
          backgroundColor: "rgba(234,84,85,.22)",
          fontWeight: "600",
        }}
      />
    );
  }
};

export const convertStatusTransaction = (status) => {
  if (status === 1) {
    return (
      <Chip
        label="Đã Thanh Toán"
        color="success"
        sx={{
          color: "#28c76f",
          backgroundColor: "rgba(40,199,111,.22)",
          fontWeight: "600",
        }}
      />
    );
  } else if (status === 2) {
    return (
      <Chip
        label="Từ Chối"
        color="error"
        sx={{
          color: "#ea5455",
          backgroundColor: "rgba(234,84,85,.22)",
          fontWeight: "600",
        }}
      />
    );
  } else if (status === 0) {
    return (
      <Chip
        label="Đang Chờ"
        color="warning"
        sx={{
          color: "#ff9f43",
          backgroundColor: "rgba(255,159,67,.22)",
          fontWeight: "600",
        }}
      />
    );
  }
};

export const convertStatusContact = (status) => {
  if (status === 1) {
    return (
      <Chip
        label="Đã liên hệ"
        color="success"
        sx={{
          color: "#28c76f",
          backgroundColor: "rgba(40,199,111,.22)",
          fontWeight: "600",
        }}
      />
    );
  } else if (status === 0) {
    return (
      <Chip
        label="Chưa liên hệ"
        color="error"
        sx={{
          color: "#ea5455",
          backgroundColor: "rgba(234,84,85,.22)",
          fontWeight: "600",
        }}
      />
    );
  }
};

export const convertStatusSupplier = (status) => {
  if (status === 1) {
    return (
      <Chip
        label="Cung cấp"
        color="success"
        sx={{
          color: "#28c76f",
          backgroundColor: "rgba(40,199,111,.22)",
          fontWeight: "600",
        }}
      />
    );
  } else if (status === 0) {
    return (
      <Chip
        label="Dừng cung cấp"
        color="error"
        sx={{
          color: "#ea5455",
          backgroundColor: "rgba(234,84,85,.22)",
          fontWeight: "600",
        }}
      />
    );
  }
};

export const htmlToDraftUtil = (draftContent) => {
  const blocksFromHtml = htmlToDraft(draftContent);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
