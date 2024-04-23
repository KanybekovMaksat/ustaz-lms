import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, IconButton, TextField } from '@mui/material';
import AuthService from '../../services/AuthService';
import { setUser } from '../../slices/authSlice';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Video from '../../assets/videos/intro-header23.mp4';
import './index.css';

const Authorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      const userData = {
        id: response.data.id,
        ...response.data,
      };
      dispatch(setUser(userData));

      toast.success('Вы успешно авторизовались!');

      const roleRoutes = {
        mentor: '/mentor/profile',
        student: '/student/profile',
        default: '/',
      };
      navigate(roleRoutes[userData.role] || roleRoutes.default);
    } catch (e) {
      toast.error('Проверьте правильность логина или пароля!');
      console.error(e.response);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      const roleRoutes = {
        mentor: '/mentor/profile',
        student: '/student/profile',
        default: '/auth',
      };
      navigate(roleRoutes[user.role] || roleRoutes.default);
    }
  }, [user, navigate]);

  return (
    <div className="video-container">
      <video autoPlay loop muted>
        <source src={Video} type="video/mp4" />
      </video>
      <div className="container">
        <div className="auth__content">
          <div className="auth__content-form">
            <h2 className="auth__form-title">
              Ustaz <span>LMS</span>
            </h2>
            <div className="auth__form-box">
              <TextField
                required
                id="Email"
                label="Email"
                variant="outlined"
                sx={{ color: 'black' }}
                onChange={(e) => setEmail(e.target.value)}
                color="info"
                value={email}
              />
            </div>
            <div className="auth__form-box">
              <TextField
                type={showPassword ? 'text' : 'password'}
                required
                id="Password"
                label="Пароль"
                variant="outlined"
                sx={{ color: 'black' }}
                onChange={(e) => setPassword(e.target.value)}
                color="info"
                value={password}  
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="password-visibility"
                      size="small"
                      color="info"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
            </div>
            <Button
              sx={{ mt: 2, width: '100%' }}
              color="info"
              variant="contained"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
