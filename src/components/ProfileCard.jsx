import { Avatar, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styled from 'styled-components';
import { logout } from '../slices/authSlice';

const StyledProfileCard = styled.div`
  padding: 24px 34px;
  display: flex;
  align-items: start;
  column-gap: 40px;
  border: 1px solid;
`;

const StyledProfileWrapper = styled.div`
  position: relative;
`;

const ProfileText = styled.p`
  font-size: 16px;
  margin: 5px 0px;
`;
const RoleBadge = styled.div`
  position: absolute;
  top: -30px;
  right: -60px;
  padding: 5px;
  backdrop-filter: blur(100px);
  border: 1px solid;
`;

const ProfileCard = () => {
  const storedUserData = JSON.parse(localStorage.getItem('user')) || {};
  const {
    role,
    last_name,
    first_name,
    email,
    profile_photo,
    telegram,
    phone_number,
  } = storedUserData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      toast.success('Вы успешно вышли с аккаунта!');
      navigate('/');
      dispatch(logout());
    } catch (e) {
      toast.error('Не получилось выйти с аккаунта!');
    }
  };

  return (
    <StyledProfileCard>
      <Avatar
        alt={first_name}
        src={`http://localhost:8000/${profile_photo}`}
        sx={{
          width: 170,
          height: 170,
          bgcolor: '#0d417d',
          color: 'white',
          border: '1px solid white',
        }}
      />
      <StyledProfileWrapper>
        <RoleBadge>{role || ''}</RoleBadge>
        <h3>
          {last_name || ''} {first_name || ''}
        </h3>
        <ProfileText>{email || ''}</ProfileText>
        <ProfileText>{telegram || ''}</ProfileText>
        <ProfileText>{phone_number || ''}</ProfileText>
        <Button
          sx={{ width: '100%', mt: 2 }}
          onClick={handleLogout}
          variant="contained"
        >
          Выйти
        </Button>
      </StyledProfileWrapper>
    </StyledProfileCard>
  );
};

export default ProfileCard;
