import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ProjectsList from './components/ProjectsList';
import styled from "styled-components";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from "../../../components/Modal"
import ProjectService from '../../../services/ProjectService';
import { Button } from '@mui/material';

const StudentProjects = () => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectType, setProjectType] = useState('practical_work');
    const [photo, setPhoto] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const saveUser = JSON.parse(localStorage.getItem("user"))
    const createProject = async () => {
        try {
            const formData = new FormData();
            formData.append('type_of_project', projectType);
            formData.append('title', title);
            formData.append('content_html', description);
            formData.append('photo', photo);
            formData.append('user', saveUser.id);
            formData.append('course', sessionStorage.getItem('selectedCourseId'));
            const response = await ProjectService.createProject(formData)
            console.log(response.data);

        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <ProjectWrapper>
            <h2>Загрузить работы</h2>
            <Button onClick={() => setModal(true)} color='info' variant='contained' startIcon={<DriveFolderUploadOutlinedIcon />}>
                Загрузить
            </Button>
            <div>
                <h2>Мои работы</h2>
                <ProjectsList />
            </div>
            <Modal active={modal} setActive={setModal}>
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                    <option value="practical_work">Практическая работа</option>
                    <option value="independent_work">Самостоятельная работа</option>
                    <option value="project">Проект</option>
                </select>
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="file" onChange={handleFileChange} />
                <button onClick={createProject}>Submit</button>
            </Modal>
        </ProjectWrapper>
    )
}

export default StudentProjects


const ProjectWrapper = styled.div`
    // button{
    //     margin-top: 8px;
    //     margin-bottom: 30px;
    //     padding: 8px 20px;
    //     display: flex;
    //     align-items: center;
    //     column-gap: 5px;
    //     border: none;
    //     border-radius: 5px;
    // }
    // button:active{
    //     background: grey;
    // }
`