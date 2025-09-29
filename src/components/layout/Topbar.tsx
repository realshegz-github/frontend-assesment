// src/components/dashboard/Topbar.tsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MdMenu } from "react-icons/md";
import { Avatar, Badge, Box, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import avartar from "../../assets/passport.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface TopbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  drawerWidth: number;
}

const Topbar = ({ open, handleDrawerOpen, drawerWidth }: TopbarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: { mt: 1.5, backgroundColor: "#0A74DC", color: "white" },
      }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
    </Menu>
  );

  const user = {
    name: "John Doe",
    avatarUrl: avartar,
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        // borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      className="shadow shadow-gray-300"
    >
      <Toolbar className=" shadow shadow-gray-300">
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            bgcolor: "#fff",
            color: "#000",

            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MdMenu />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton color="inherit">
            <Badge variant="dot" color="error">
              <IoMdNotificationsOutline size={24} />
            </Badge>
          </IconButton>

          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 2,
              p: 0.5,
            }}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt={user.name}
              src={user.avatarUrl}
            />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                {user.name}
              </Typography>
            </Box>
            <MoreHorizIcon sx={{ color: "#C4C4C4" }} />
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Topbar;
