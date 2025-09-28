import * as React from "react";
import { Box, CssBaseline, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import useWindowSize from "../../utils/hooks/useWindowSize";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";

export const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DashboardLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width < 900;

  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ display: "flex" }}
      className="bg-transparent w-full min-h-screen"
    >
      <CssBaseline />
      <Topbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        className="bg-transparent w-full h-full"
        sx={{ flexGrow: 1, px: 3, py: 5, minHeight: "100%" }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
