import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "src/component/Toast";
import { enviroment } from "src/enviroment";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "error" | "warning" | "info" | "success";
  }>({ open: false, message: "", type: "success" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    //  API Call
    try {
      const response = await axios.post(
        `${enviroment.baseURL}/login`,
        formData
      );

      const token = response.data.token;
      // Store token in localStorage
      localStorage.setItem("token", token);

      setToast({
        open: true,
        message: "Login successful!",
        type: "success",
      });
      navigate("/dashboard");
      console.log("API Response: ", response);
    } catch (error: any) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <Box
        className="shadow-lg p-8 rounded-md max-w-md w-full"
        sx={{
          boxShadow: 3,
          backgroundColor: "background.paper", // Lighter black shade
        }}
      >
        <Typography
          variant="h4"
          className="!mb-8 text-center"
          sx={{ color: "text.primary" }}
        >
          Login to Playlist
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />
          </div>
          <div className="mb-6">
            <TextField
              label="Password"
              name="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
            />
          </div>
          <Button type="submit" fullWidth variant="contained" color="success">
            Login
          </Button>
        </form>
        <Typography
          variant="body1"
          className="!mt-4 text-center"
          color="primary"
        >
          Don't have an account?{" "}
          <a href="/register" className="underline">
            Sign Up
          </a>
        </Typography>
      </Box>
      <Toast toast={toast} handleCloseToast={handleCloseToast} />
    </div>
  );
};
export default Login;
