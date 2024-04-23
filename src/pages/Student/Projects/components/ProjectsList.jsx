import React from 'react'
import ProjectCard from '../../../../components/ProjectCard';

const ProjectsList = () => {
    const projectData = [
        {
            title: "React: Новые возможности.",
            category: "Самостоятельная работа",
            date: "3 Ноября, 2023", 
            student:"Каныбеков Максат"
        }
    ];
    return (
        <div>
            {projectData.map((data, index) => {
                return <ProjectCard data={data} />
            })}
        </div>
    )
}

export default ProjectsList