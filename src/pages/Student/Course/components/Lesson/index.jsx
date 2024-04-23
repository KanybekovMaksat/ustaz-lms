import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Link } from 'react-router-dom'

import './index.css'

const Lesson = ({ type, title, order, id }) => {
  return (
    <Paper elevation={3} className="lesson-card">
      <Typography variant="h6" component="div">
        {order}.{title}
      </Typography>
      <button className="lesson__card-btn">
        {type === 'student' ? (
          <Link to={`/student/course/lesson/${id}`}>
            <RemoveRedEyeOutlinedIcon />
          </Link>
        ) : (
          <Link to={'lesson'}>
            <EditIcon />
          </Link>
        )}
      </button>
    </Paper>
  )
}

export default Lesson
