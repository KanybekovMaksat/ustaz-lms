import { useState, useEffect } from 'react';
import {
  LinearProgress,
  useTheme,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { tokens } from '../theme';
import UserService from '../services/UserService';

//import images and icons
import ProgramImg from '../assets/images/shaking-hands.png';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';

//progress component for course card;
function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        marginBottom: '7px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <LinearProgress color="info" variant="determinate" {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const CourseCard = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [progress, setProgress] = useState(10);
  const { title, mentor, duration, created, photo } = data;
  const [mentorName, setMentorName] = useState('');

  useEffect(() => {
    const getMentorFullName = async (mentorId) => {
      try {
        const response = await UserService.getUser(mentorId);
        console.log(response.data);
        setMentorName(response.data.first_name);
      } catch (e) {
        console.log(e);
      }
    };

    const calculateProgress = () => {
      const startDate = new Date(data.start_month);
      const endDate = new Date(data.end_month);
      const currentDate = new Date();

      if (currentDate < startDate) {
        setProgress(0);
      } else if (currentDate > endDate) {
        setProgress(100);
      } else {
        const elapsedTime = currentDate - startDate;
        const courseDurationInMilliseconds = endDate - startDate;

        const calculatedProgress =
          (elapsedTime / courseDurationInMilliseconds) * 100;
        setProgress(calculatedProgress);
      }
    };

    getMentorFullName(mentor);
    calculateProgress();

    const timer = setInterval(() => {
      calculateProgress();
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [mentor, duration, created]);

  const getMonthDifference = (startDate, endDate) => {
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    return monthsDiff;
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '320px',
        maxWidth: '320px',
        maxHeight: '155px',
        background: colors.primary[400],
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography sx={{ fontSize: '15px' }} component="div" variant="h5">
            {title.toUpperCase() || 'Course'}
          </Typography>
          <Typography
            sx={{ fontSize: '12px' }}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {mentorName || 'Mentor'}
          </Typography>
        </CardContent>
        <CardContent>
          <LinearProgressWithLabel value={progress} />
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
            <TimelapseOutlinedIcon />
            <Typography
              sx={{ fontSize: '12px' }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {getMonthDifference(
                new Date(data.start_month),
                new Date(data.end_month)
              )}{' '}
              месяцев
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={photo || ProgramImg}
        title={title || 'title'}
      />
    </Card>
  );
};

export default CourseCard;
