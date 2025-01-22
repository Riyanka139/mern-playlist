import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Add your API call here
  };

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100 p-5">
      <Box
        className="bg-white shadow-lg p-8 rounded-md max-w-md w-full"
        sx={{ boxShadow: 3 }}
      >
        <Typography variant="h4" className="mb-8 text-center text-blue-600">
          Login
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
              className="bg-gray-50"
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
              className="bg-gray-50"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            sx={{ color: "white" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" className="mt-4 text-center text-gray-600">
          Already haven't an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </Typography>
      </Box>
    </div>
  );
};
export default Login;