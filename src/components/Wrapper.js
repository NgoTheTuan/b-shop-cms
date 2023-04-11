import { Box, Card, styled } from "@mui/material";

const WrapperPage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function WrapperPages({ children }) {
  return (
    <WrapperPage>
      <Card sx={{ padding: 3, width: "100%", height: "100%" }}>{children}</Card>
    </WrapperPage>
  );
}

export default WrapperPages;
