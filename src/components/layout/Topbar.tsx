// src/components/dashboard/Topbar.tsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MdMenu, MdNotifications } from "react-icons/md";
import { Avatar, Badge, Box, Menu, MenuItem } from "@mui/material";
import { getInitials } from "../../utils/hooks/helpers";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
        sx: { mt: 1.5, backgroundColor: "#1F2937", color: "white" },
      }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );

  const user = "John Doe";
  return (
    <AppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth}
      elevation={0}
      sx={{
        backgroundColor: "#111827",
        color: "#fff",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            color: "#fff",
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MdMenu />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <MdNotifications size={24} />
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
              sx={{ bgcolor: "#005BFD", width: 40, height: 40 }}
              src={user}
            >
              {user && getInitials(user)}
            </Avatar>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
                {user}
              </Typography>
            </Box>
            <MoreHorizIcon />
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Topbar;
