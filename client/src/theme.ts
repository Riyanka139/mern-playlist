import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,

  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    success: {
      main: "#28a745", // Green for success
      contrastText: "#fff", // White text
    },
    error: {
      main: "#dc3545", // Red for error
      contrastText: "#fff", // White text
    },
    info: {
      main: "#17a2b8", // Blue for info
      contrastText: "#fff", // White text
    },
    warning: {
      main: "#ffc107", // Yellow for warning
      contrastText: "#000", // Black text
    },
  },
  //   override alert style
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #ccc",
        },
        standardSuccess: {
          backgroundColor: "#e0f7fa",
          color: "#00796b",
        },
        standardError: {
          backgroundColor: "#ffebee",
          color: "#d32f2f",
        },
        standardWarning: {
          backgroundColor: "#fff3e0",
          color: "#f57c00",
        },
        standardInfo: {
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
        },
      },
    },
  },
});

export default theme;
