import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#031434",
    },
    background: {
      default: "#fafafa",
      // paper: "#e4e5f1",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: `"Inter", sans-serif`,
    h1: {
      fontSize: "3.375rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1512,
    },
  },
});

export default theme;
