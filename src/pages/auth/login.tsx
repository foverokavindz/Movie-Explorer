import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Check if credentials match admin credentials
      if (
        formData.email === 'admin@admin.com' &&
        formData.password === 'password'
      ) {
        dispatch(
          setUser({ email: formData.email, name: 'Admin', isLoggedIn: true })
        );
        navigate('/home');
      } else {
        // Set error messages for invalid credentials
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
        console.log('Login failed - Invalid credentials');
      }
    }
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
        <LockOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: '100%' }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
          InputProps={{
            sx: { borderRadius: 1 },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
          InputProps={{
            sx: { borderRadius: 1 },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 3,
            py: 1.5,
            borderRadius: 1,
            fontSize: '1rem',
          }}
        >
          Sign In
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Typography>Username - admin@admin.com</Typography>
          <Typography>Password - password</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
