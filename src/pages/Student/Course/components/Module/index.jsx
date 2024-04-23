import React, { useEffect, useState } from 'react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import Typography from '@mui/material/Typography'
import Lesson from '../Lesson/index'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'
import './index.css'
import ModuleService from '../../../../../services/ModuleService'
import {  tokens } from "../../../../../theme";
import { useTheme } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop: '20px',
  background: 'none',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    borderRadius:"8px",
    transition: 'height 0.3s ease',
  })
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: 'none',
  transition: '3s ease',
}))





const Module = ({data}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = useState(false  )
  const [lectures, setLectures] = useState([])

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ?  panel : false)
  }

  const {title, description, id, order} = data

  
  const getLectures = async () => {
    try {
      const response = await ModuleService.getLectures(id);
      setLectures(response.data)
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getLectures();
  },[]);


  return (
    <div className="module-content">
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <div className="moduls">
            <div className="">
              <Typography variant="h5" component="div">
               {order}.{title}
              </Typography>
              <Typography variant="body2">
               {description}
              </Typography>
            </div>
            <div className="">
              <button className="module__info-btn" style={{background:colors.primary[400]}}>
                <FolderOpenOutlinedIcon />
                Изучить
              </button>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>{lectures.length === 0 ? "Уроков нет" : 
          lectures.map((lessons, index) => {
            return <Lesson title={lessons.title} order={lessons.order}  id={lessons.id} type={'student'} />
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Module
