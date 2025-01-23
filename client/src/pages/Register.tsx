import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "src/component/Toast";
import { enviroment } from "src/enviroment";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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

     // Password validation (min 4 characters)
     if (formData.password.length < 4) {
      setToast({
        open: true,
        message: "Password must be at least 4 characters long",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(`${enviroment.baseURL}/register`, formData);
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      setToast({
        open: true,
        message: "Registration successful!",
        type: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error,typeof error);
      setToast({
        open: true,
        message: axios.isAxiosError(error) ? error.response?.data?.message: "Something went wrong. Please try again.",
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
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" className="!mb-6 text-center">
          Sign Up to Playlist
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            Sign Up
          </Button>
        </form>
        <Typography
          variant="body1"
          className="!mt-4 text-center"
          color="primary"
        >
          Already have an account?{" "}
          <a href="/" className="underline">
            Log in
          </a>
        </Typography>
      </Box>
      {/* Toast message */}
      <Toast toast={toast} handleCloseToast={handleCloseToast} />
    </div>
  );
};

export default Register;
