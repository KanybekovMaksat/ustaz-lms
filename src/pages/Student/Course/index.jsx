import React, { useEffect, useState } from 'react'
import Module from './components/Module/index';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import "./index.css";
import ModuleService from '../../../services/ModuleService';


const Lecture = () => {

  const [modules, setModules] = useState([]);
  const courseId = sessionStorage.getItem('selectedCourseId');
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

  getModule()
  return (
    <div className='mentor-container'>
      <h2 className='mc__title'>Лекции 
      <ImportContactsOutlinedIcon/>
      </h2>
        <div className="mc__lecture-container">
          {modules.map((data) => {
            return <Module data={data}/>
          })}
        </div>
    </div>
  )
}

export default Lecture