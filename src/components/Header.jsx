import { useState, useContext } from 'react';
import {
  useTheme,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Badge,
  IconButton,
  Typography,
  Toolbar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { ColorModeContext, tokens } from '../theme';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';

//import icons
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

//styled badge component
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Header() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const toProfilePage = () => {
    if (user) {
      switch (user.role) {
        case 'mentor':
          navigate('/mentor/profile');
          break;
        case 'student':
          navigate('/student/profile');
          break;
        default:
          navigate('/');
      }
      handleMenuClose();
    }
  };

  const handleLogout = () => {
    try {
      toast.success('Вы успешно вышли с аккаунта!');
      navigate('/');
      dispatch(logout());
    } catch (e) {
      toast.error('Не получилось выйти с аккаунта!');
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={toProfilePage}>Профиль</MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon /> Выйти
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '5px',
          height: '70px',
          background: colors.primary[400],
        }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Ustaz LMS
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: colors.greenAccent[300],
                  }}
                  alt={user.first_name}
                  src={`http://localhost:8000/${user.profile_photo}`}
                />
              </StyledBadge>
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
      {renderMenu}
    </Box>
  );
}
