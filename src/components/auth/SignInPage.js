"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/home"), 1200);
      }, 1200);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #E3F2FD, #E1E1E1)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          LeaveNow
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Welcome back! Please login to continue
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <Link
              href="#"
              underline="hover"
              color="primary"
              fontSize="0.9rem"
              onClick={(e) => {
                e.preventDefault();
                alert("Forgot Password flow coming soon 💌");
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          {/* Divider */}
          <Box
            sx={{
              textAlign: "center",
              my: 3,
              position: "relative",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                width: "40%",
                height: "1px",
                backgroundColor: "#ccc",
              },
              "&::before": { left: 0 },
              "&::after": { right: 0 },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "inline-block", px: 1, background: "#fff" }}
            >
              OR
            </Typography>
          </Box>

          {/* Create Account */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={() => router.push("/signup")}
          >
            Create New Account
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
