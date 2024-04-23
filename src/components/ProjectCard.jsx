import {
  useTheme,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Rating,
} from '@mui/material';

import { tokens } from '../theme';

//import images and icons
import ProjectImg from '../assets/images/project.png';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProjectCard = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { title, category, date, student } = data;
  return (
    <Card sx={{ maxWidth: 270, background: colors.primary[400] }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors.blueAccent[500] }} aria-label="project">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="edit">
            <MoreVertIcon />
          </IconButton>
        }
        title={student}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={ProjectImg}
        alt="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body1"
          color={colors.blueAccent[600]}
          sx={{
            fontWeight: 'bold',
            background: 'white',
            padding: '3px',
            margin: '0px 0px 10px 0px',
            borderRadius: '2px',
          }}
        >
          {category}
        </Typography>
        <Rating name="read-only" value={5} readOnly />
        <Typography variant="h5">{title}</Typography>
        <CardActions></CardActions>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
