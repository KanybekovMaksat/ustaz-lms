import React from 'react'
import ProjectCard from '../../../components/ProjectCard';
const MentorProjects = () => {
    const projectData = [
        {
            title: "Разработка онлайн-магазина",
            category: "Проект",
            date: "18 Октября, 2023",
            student:"Малабакиев Рамзан"
        },
        {
            title: "React: Новые возможности.",
            category: "Самостоятельная работа",
            date: "3 Ноября, 2023",
            student:"Каныбеков Максат"
        },
        {
            title: "Разработка CRM-платформы",
            category: "Курсовая работа",
            date: "01 Сентября, 2023",
            student:"Айтбаев Бекзат"
        },
        {
            title: "Создание лендинг страницы",
            category: "Практическая работа",
            date: "10 Октября, 2023",
            student:"Жумадылов Адахан"
        },
    ];
  return (
    <div>       
        <h2 className='project-title'>Работы студентов</h2>
        <div style={{display:"flex", flexWrap:"wrap", gap:"20px", marginTop:"20px"}}>
        {projectData.map((data, index) => {
            return <ProjectCard data={data} />
        })}
        
        </div>
    </div>
  )
}

export default MentorProjects