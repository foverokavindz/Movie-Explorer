import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form logic here
      console.log('Form submitted:', formData);
      // Add registration logic
    }
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, width: '100%' }}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            label="Full Name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            borderRadius: 1,
            fontSize: '1rem',
          }}
        >
          Sign Up
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link
            component={RouterLink}
            to="/auth/login"
            variant="body2"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Register;
