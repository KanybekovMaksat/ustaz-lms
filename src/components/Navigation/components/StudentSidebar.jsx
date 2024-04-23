import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { tokens } from "../../../theme";
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import Ustaz from "../../../assets/images/orn.png";
import { useEffect} from 'react'
import { fetchAllCourses, selectCourses} from "../../../slices/CourseSlice"
import { useDispatch, useSelector } from 'react-redux';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const StudentSidebar = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [click, setClick] = useState(false)
  const courses = useSelector(selectCourses);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCourseClick = (courseId) => {
    sessionStorage.setItem('selectedCourseId', courseId);
    setClick(true)
  };
  
  
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);

const storedId = sessionStorage.getItem('selectedCourseId');
useEffect(() => {
  if (user.student_courses) {
    dispatch(fetchAllCourses(user.student_courses));
  }
}, [click]);

  return (
    <Box
      sx={{
        overflowX: "hidden", 
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          overflow: "hidden",
        },
        "& .pro-sidebar-layout":{
          overflowY:"hidden !important",

        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "grey !important",
        },
        "& .pro-menu-item.active": {
          color: "#0063f7 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Студент <SchoolIcon fontSize="medium"/>
                </Typography>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
            {isCollapsed ? null : "Главная"}
            </Typography>

            <Item
              title="Панель"
              to="/student/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Награды"
              to="/student/awards"
              icon={<EmojiEventsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {storedId !== null && storedId !== undefined ? 
            <>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "60px 0 5px 20px" }}
            >
              {isCollapsed ? null : "Обучение"}
            </Typography>
            <Item
              title="Расписание"
              to="/student/schedule"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Лекции"
              to="/student/course"
              icon={<LibraryBooksOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Успеваемость"
              to="/student/score"
              icon={<GradeOutlinedIcon  />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
                title="Проекты"
                to="/student/projects"
                icon={<AssignmentTurnedInOutlinedIcon  />}
                selected={selected}
                setSelected={setSelected}
              />
                 <Button
                sx={{
                  m: "15px 0 5px 20px",
                  bgcolor: colors.blueAccent[700],
                  ':hover': { bgcolor: colors.blueAccent[800] },
                  maxWidth: isCollapsed ? "30px" : "none",
                  minWidth: "0 !important",
                }}
                variant="contained"
                startIcon={isCollapsed ? null : <AddIcon />}
              >
                {isCollapsed ? <AddIcon /> : 'Новый проект'}
              </Button>
              </> :             (
              courses && courses.map((data) => (
                <Button
                sx={{
                  m: "15px 0 5px 20px",
                  bgcolor: colors.blueAccent[700],
                  ':hover': { bgcolor: colors.blueAccent[800] },
                  maxWidth: isCollapsed ? "30px" : "none",
                  minWidth: "0 !important",
                }}
                variant="contained"
                onClick={() => handleCourseClick(data.id)}
                startIcon={isCollapsed ? null : <BookOutlinedIcon />}
              >
                {isCollapsed ? <BookOutlinedIcon/>  : data.title}
              </Button>
              ))
             ) 
              }
              <img style={{opacity:0.4, height:"150px", position:"absolute",zIndex:"-1", top:"600px", left:"-300px", rotate:"90deg"}} src={Ustaz} alt="" />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default StudentSidebar;
