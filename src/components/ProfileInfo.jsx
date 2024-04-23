import { Avatar } from '@mui/material';

//import icons
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfileInfo = () => {
  const storedUserData = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Личная информация</h3>
        <Button sx={{ bgcolor: '#452fe5' }} variant="contained">
          Сохранить{' '}
        </Button>
      </div>
      <TextField
        required
        color="info"
        id="outlined-required"
        label="Имя"
        defaultValue={storedUserData.first_name || ''}
      />
      <TextField
        required
        color="info"
        id="outlined-required"
        label="Фамилия"
        defaultValue={storedUserData.last_name || ''}
      />
      <TextField
        required
        color="info"
        id="outlined-required"
        label="Email"
        defaultValue={storedUserData.email || ''}
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <TextField
          required
          color="info"
          id="outlined-required"
          label="Номер телефона"
          defaultValue={storedUserData.phone_number || ''}
        />
        <TextField
          required
          color="info"
          id="outlined-required"
          label="Telegram"
          defaultValue={'@mxknb'}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Avatar
          sx={{ width: '100px', height: '100px' }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <input type="image" name="" id="" />
      </div>
    </div>
  );
};

export default ProfileInfo;
