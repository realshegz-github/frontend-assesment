import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  styled,
  type Theme,
  type CSSObject,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdSupportAgent,
  MdChat,
  MdConfirmationNumber,
  MdGroup,
  MdSettings,
  MdChevronLeft,
} from "react-icons/md";

const navItems = [
  { text: "Dashboard", icon: <MdDashboard size={24} />, path: "/dashboard" },
  {
    text: "Assistant",
    icon: <MdSupportAgent size={24} />,
    path: "/dashboard/assistant",
  },
  {
    text: "Conversations",
    icon: <MdChat size={24} />,
    path: "/dashboard/conversations",
  },
  {
    text: "Ticket",
    icon: <MdConfirmationNumber size={24} />,
    path: "/dashboard/ticket",
  },
  { text: "Teams", icon: <MdGroup size={24} />, path: "/dashboard/teams" },
  {
    text: "Settings",
    icon: <MdSettings size={24} />,
    path: "/dashboard/settings",
  },
];

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
  drawerWidth: number;
}

const SideBar = ({ open, handleDrawerClose, drawerWidth }: SideBarProps) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      drawerWidth={drawerWidth}
      PaperProps={{
        sx: { background: "#2370f8" },
      }}
    >
      <DrawerHeader>
        <img
          src={""}
          alt="Logo"
          style={{
            height: "24px",
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
        <IconButton onClick={handleDrawerClose} sx={{ color: "#d1d5dc" }}>
          <MdChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List sx={{ p: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block", my: 1 }}
          >
            <NavLink
              to={item.path}
              end
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "#e4e7ec",
                backgroundColor: isActive ? "#005BFD" : "transparent",
                borderRadius: "12px",
                display: "block",
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "rgba(0, 91, 253, 0.5)",
                    borderRadius: "12px",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
