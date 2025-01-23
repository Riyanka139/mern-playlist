import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";
import AuthRoute from "./component/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute type="public">
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute type="public">
              <Register />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute type="protected">
              <Dashboard />
            </AuthRoute>
            // <Dashboard />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
