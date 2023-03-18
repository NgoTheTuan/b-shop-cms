import { Badge, Box, ButtonBase, Divider, styled, Avatar } from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import { H6, Small, Tiny } from "../../../components/Typography";

import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout";
import noAvatar from "../../../assets/noAvatar.png";
import { useDispatch } from "react-redux";
import AuthAction from "../../../store/actions/auth";
import { useSelector } from "react-redux";
// styled components
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.divider,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.primary[200],
}));

const ProfilePopover = () => {
  const user = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  // const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = (path) => {
    navigate(path);
    setOpen(false);
  };

  const logout = () => {
    dispatch({
      type: AuthAction.LOGOUT,
    });
    toast.success("Đăng xuất thành công !");
    navigate("/login");
  };

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <StyledAvatar
            src={user?.avatar || noAvatar}
            sx={{ width: 30, height: 30, ml: 1 }}
          />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <img src="" alt="" sx={{ width: 35, height: 35 }} />

            <Box ml={1}>
              <H6>{user?.username || ""}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {user?.email || ""}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={() => handleMenuItem("/user-setting")}>
            Cài đặt
          </StyledSmall>
          <Divider sx={{ my: 1 }} />

          <StyledSmall onClick={logout}>Đăng xuất</StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
