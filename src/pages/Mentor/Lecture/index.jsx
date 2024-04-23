import { useState, useEffect } from 'react'
import Module from './components/Module/index';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import Modal from '../../../components/Modal';
import { useTheme, Button, Menu, MenuItem } from "@mui/material";
import { tokens } from "../../../theme";
import "./index.css";
import ModuleService from '../../../services/ModuleService';
import { toast } from "react-toastify";


const StudentCourse = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const courseId = sessionStorage.getItem('selectedCourseId');



  const createModule = async () => {
    try {
      const response = await ModuleService.createModule({ title, description, course:courseId });
      console.log(response.data);
      toast.success("Модуль успешно создан!");
      setTitle("");
      setDescription("");
      setModal(false);
    } catch (e) {
      toast.error("Не удалось создать модуль...")
      console.log(e.response);
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modules, setModules] = useState([]);
  const getModule = async () =>{
    try {
      const response = await ModuleService.getModule(courseId);
      setModules(response.data)
      
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() =>{
    getModule()
  },[])

  
  return (
    <div className='mentor-container'>
      <h2 className='mc__title'>Учебный план курса</h2>
      <p className='mc__emptytxt'>Создайте учебный план</p>
      <button className='mcourse__addmodule' style={{ background: colors.grey[500] }} onClick={() => setModal(true)}>
        <CreateNewFolderOutlinedIcon />
        Добавить модуль
      </button>
      <div className="mc__lecture-container">
      {modules.map((data) => {
            return <Module data={data}/>
          })}
      </div>
      
      <Modal active={modal} setActive={setModal}>
        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "black" }}>Добавить новый модуль</h2>
          <input
            type="text"
            placeholder='Название модуля'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "15px", margin: "10px 0px" }} />
          <input
            type="text"
            placeholder='Описание модуля'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "15px", margin: "10px 0px" }} />
          <Button variant="contained" onClick={createModule}>Создать модуль</Button>
        </div>
      </Modal>
    </div>
  )
}

export default StudentCourse