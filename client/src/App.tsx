import { AppBar, Toolbar, Typography } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex-grow">
            Spotify Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={
           <ProtectedRoute><Dashboard/></ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
