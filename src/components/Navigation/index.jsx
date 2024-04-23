import React from 'react'

//import sidebar templates
import MentorSidebar from './components/MentorSidebar';
import StudentSidebar from './components/StudentSidebar';

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
    {user.role === "mentor" ? <MentorSidebar/> : <StudentSidebar/>} 
    </>
  )
}

export default SideBar
