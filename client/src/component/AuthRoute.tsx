import React, { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";

const AuthRoute: React.FC<{
  type: "public" | "protected";
  children: ReactNode;
}> = ({ children, type }) => {
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (type === "protected") {
    const signout = () => {
      localStorage.removeItem("token");
      setAnchorEl(null);
    };
    // Check if the route is protected and the user is authenticated
    if (!token) return <Navigate to="/" />;

    try {
      jwtDecode(token);
      
      // set token to header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } catch {
      return <Navigate to="/" />;
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="flex-grow">
              Playlist Dashboard
            </Typography>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={signout}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {children}
      </>
    );
  }

  if (type === "public") {
    // Redirect authenticated users away from public routes
    if (token) {
      try {
        jwtDecode(token);
        return <Navigate to="/dashboard" />;
      } catch {
        localStorage.removeItem("token");
      }
    }
    return children; // Render the public route
  }

  return children;
};

export default AuthRoute;
