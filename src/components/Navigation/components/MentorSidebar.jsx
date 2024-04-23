import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Button } from '@mui/material';
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlined as HomeOutlinedIcon,
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
  GradeOutlined as GradeOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  AddTaskOutlined as AddTaskOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  BookOutlined as BookOutlinedIcon
} from '@mui/icons-material';

import { tokens } from "../../../theme";
import { fetchAllCourses, selectCourses } from "../../../slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";


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




const MentorSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [click, setClick] = useState(false)
  const [selected, setSelected] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  
  const handleCourseClick = (courseId) => {
    sessionStorage.setItem('selectedCourseId', courseId);
    setClick(true)
  };

  const storedId = sessionStorage.getItem('selectedCourseId');
  
  useEffect(() => {
    if (user.mentor_courses) {
      dispatch(fetchAllCourses(user.mentor_courses));
    }
  }, [click]);

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          maxWidth: "220px !important",
          minWidth: "200px !importtant"
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 30px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "grey !important",
        },
        "& .pro-menu-item.active": {
          color: "grey !important",
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
                  Ментор
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
              {isCollapsed ? "" : "Главная"}
            </Typography>
            <Item
              title="Панель"
              to="/mentor/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {storedId !== null && storedId !== undefined ? (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "20px 0 5px 20px" }}
                >
                  {isCollapsed ? "" : "Группа"}
                </Typography>
                <Item
                  title="Занятия"
                  to="/mentor/schedule"
                  icon={<CalendarMonthOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Лекции"
                  to="/mentor/lecture"
                  icon={<LibraryBooksOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Оценки"
                  to="/mentor/student-rating"
                  icon={<GradeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Проекты"
                  to="/mentor/student-projects"
                  icon={<AssignmentTurnedInOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              courses &&
              courses.map((data) => (
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
                  {isCollapsed ? <BookOutlinedIcon /> : data.title}
                </Button>
              ))
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default MentorSidebar;
