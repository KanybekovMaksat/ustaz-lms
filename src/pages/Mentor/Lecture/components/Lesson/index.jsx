import {useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "./index.css"
import { Link } from 'react-router-dom';

const Lesson = ({title, id}) => {
  const [modal, setModal] = useState(false);
  return (
    <Paper elevation={3} className="lesson-card" >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Link to={`/mentor/update-lesson/lesson/${id}`} >
          gtht
        </Link>
    </Paper>
  )
}

export default Lesson