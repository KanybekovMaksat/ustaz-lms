import styled from 'styled-components';

//import icons
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.7s ease-in-out;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;

const StyledModalContent = styled.div`
  width: 625px;
  padding: 35px;
  position: relative;
  border-radius: 5px;
  background: white;
  transform: scale(0.5);
  transition: all 0.4s;

  &.active {
    transform: scale(1);
  }
`;

const Modal = ({ active, setActive, children }) => {
  return (
    <StyledModal
      className={active ? 'active' : ''}
      onClick={() => setActive(false)}
    >
      <StyledModalContent
        className={active ? 'active' : ''}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={() => setActive(false)}
          sx={{ position: 'absolute', top: '2px', right: '0' }}
          aria-label="cancel"
          size="large"
        >
          <ClearIcon sx={{ color: 'black' }} />
        </IconButton>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
