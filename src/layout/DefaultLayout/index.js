import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState, Fragment } from "react";
import { Box, styled } from "@mui/material";
const Wrapper = styled(Box)(({ theme }) => ({
  width: `calc(100% - 80px)`,
  maxWidth: "100%",
  margin: "auto",
  paddingLeft: 80,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

function DefaultLayout({ children }) {
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  return (
    <Fragment>
      <Sidebar
        showMobileSideBar={showMobileSideBar}
        closeMobileSideBar={() => setShowMobileSideBar(false)}
      />

      <Wrapper>
        <Navbar
          setShowMobileSideBar={() => setShowMobileSideBar(!showMobileSideBar)}
        />
        {children}
      </Wrapper>
    </Fragment>
  );
}

export default DefaultLayout;
