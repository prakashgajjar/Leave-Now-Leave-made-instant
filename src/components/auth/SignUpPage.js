"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // for redirecting after OTP verify
import { SignupHandle } from "@/services/auth/SignUp.services";
import { OtpHandle } from "@/services/auth/Otp.services";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState("signup"); // signup | otp
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  //send data to services

  // Validate function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

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

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  // Handle sign-up submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const res = await SignupHandle(
        formData.email,
        formData.password,
        formData.role,
        formData.name
      );
      console.log(res);
      if (res?.flag == true) setLoading(false);
      setStep("otp");
      setSuccess("OTP sent to your email!");
    } else {
      setLoading(false);
      const error = res?.error;
      setErrors({ error });
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    const res = await OtpHandle(otp);
    if (res?.flag == true) {
      setSuccess("Account created successfully! Redirecting...");
      setLoading(true);
      router.push("/v1/dashboard");
    } else {
      setErrors({ otp: "Invalid OTP, please try again" });
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
          {step === "signup" ? "Sign up to your account" : "Verify your OTP"}
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {step === "signup" ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
            />

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

            {/* Role Selector */}
            <TextField
              select
              label="Select Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={!!errors.role}
              helperText={errors.role}
              disabled={loading}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="warden">Girl Hostel Warden</MenuItem>
            </TextField>

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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify}>
            <TextField
              label="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setErrors({});
              }}
              fullWidth
              required
              margin="normal"
              error={!!errors.otp}
              helperText={errors.otp}
            />

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
            >
              Verify OTP
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}
