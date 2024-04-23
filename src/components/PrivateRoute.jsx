import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  return user ? children : navigate('/auth');
};

export default PrivateRoute;
