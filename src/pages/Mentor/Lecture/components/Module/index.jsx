import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Lesson from '../Lesson/index';
import Modal from '../../../../../components/Modal';
import { Button, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModuleService from '../../../../../services/ModuleService';
import { toast } from 'react-toastify';
import "./index.css";
import LessonService from '../../../../../services/LessonService';

const Module = ({ data }) => {
  const { title, description, id } = data;
  const [lectures, setLectures] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [moduleTitle, setModuleTitle] = useState(title);
  const [moduleDescription, setModuleDescription] = useState(description);

  const handleTitleChange = (e) => {
    setModuleTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setModuleDescription(e.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModal(true)
    setAnchorEl(null);
  }
  const navigate = useNavigate();

  const getLectures = async () => {
    try {
      const response = await LessonService.getLessons(id);
      setLectures(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getLectures();
  }, [id]);

  const toAddLessonPage = () => {
    navigate(`/mentor/create-lesson/lesson/${id}`);
  };

  const deleteModule = async () => {
    try {
      await ModuleService.deleteModule(id);
      toast.success("Модуль успешно удален!");
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateModule = async () => {
    try {
      await ModuleService.updateModule(id, { title: moduleTitle, description: moduleDescription });
      toast.success("Модуль успешно обновлен!");
    } catch (error) {
      toast.error("Не удалось обновить урок!");
      console.log(error.response);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={toAddLessonPage} sx={{ columnGap: '10px' }}>
        <AddIcon />
        Добавить урок
      </MenuItem>
      <MenuItem onClick={handleModalOpen} sx={{ columnGap: '10px' }}>
        <EditIcon />
        Редактировать
      </MenuItem>
      <MenuItem onClick={deleteModule} sx={{ columnGap: '10px' }}>
        <DeleteIcon />
        Удалить
      </MenuItem>
    </Menu>
  );

  return (
    <div className='module'>
      <Paper elevation={2} className="module-card">
        <div className="module__card-info">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </div>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        {renderMenu}
      </Paper>
      {lectures.map((data) => (
        <Lesson key={data.id} title={data.title} id={data.id} />
      ))}
      <Modal active={modal} setActive={setModal}>
        <div className="" style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
          <h2 style={{ color: "black" }}>Редактировать новый модуль</h2>
          <input
            type="text"
            placeholder='Название модуля'
            value={moduleTitle}
            onChange={handleTitleChange}
            style={{ padding: "15px" }}
          />
          <input
            type="text"
            placeholder='Описание модуля'
            value={moduleDescription}
            onChange={handleDescriptionChange}
            style={{ padding: "15px" }}
          />
          <Button variant="contained" color="info" onClick={updateModule}>Редактировать модуль</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Module;
