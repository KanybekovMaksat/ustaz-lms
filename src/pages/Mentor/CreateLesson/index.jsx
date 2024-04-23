import TextField from '@mui/material/TextField';
import TextEditor from '../../../components/TextEditor';
import { useEffect, useState } from 'react';
import LessonService from '../../../services/LessonService';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import {toast} from "react-toastify";

const CreateLesson = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('Урок первый');
    const [content_html, setContentHtml] = useState('');
  
    const handleTextChange = (content) => {
      setContentHtml(content);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
    
    const createLesson = async () => {
      try {
        const response = await LessonService.createLesson({title,content_html,module:id})
        console.log(response.data);
        toast.success("Урок успешно создан!")
      } catch (e) {
        console.log(e.response);
        toast.error("Не удалось создать урок!")
      }
    }

  return (
    <Box sx={{p:2, display:"flex", flexDirection:"column", rowGap:"20px",   borderRadius:"10px"}}>
      <input type="text"
       required
       value={title}
       onChange={handleTitleChange}
       style={{padding:"15px 15px"}}
      />    
        <TextEditor  onTextChange={handleTextChange}/>
        <Button variant='contained' color="info" onClick={createLesson}>Создать урок</Button>
    </Box>
  )
}

export default CreateLesson