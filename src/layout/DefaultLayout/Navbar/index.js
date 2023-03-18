import {
  AppBar,
  Box,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import { H2 } from "../../../components/Typography";
import logo from "../../../assets/logo.jpg";
import ProfilePopover from "./ProfilePopover";
// import ServicePopover from "./popovers/ServicePopover";

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const ToggleIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: theme.palette.primary.main,
}));

function Navbar({ setShowMobileSideBar }) {
  const { title } = "B Shop";
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const downSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  if (downSm) {
    return (
      <DashboardNavbarRoot position="sticky">
        <StyledToolBar>
          <Box sx={{ cursor: "pointer" }} onClick={setShowMobileSideBar}>
            <ToggleIcon />
            <ToggleIcon />
            <ToggleIcon />
          </Box>

          <Box flexGrow={1} textAlign="center">
            <img src={logo} width="50" height="30" alt="Logo" />
          </Box>

          <ProfilePopover />
        </StyledToolBar>
      </DashboardNavbarRoot>
    );
  }

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
        <Box>
          <ToggleIcon />
          <ToggleIcon />
          <ToggleIcon />
        </Box>

        <H2
          fontSize={21}
          lineHeight={0}
          mx={1}
          fontWeight="700"
          color="text.primary"
        >
          {title}
        </H2>

        <Box flexGrow={1} ml={1} />

        <ProfilePopover />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
}

export default Navbar;
