import { Route, Routes } from 'react-router-dom'

// General pages
import Authorization from './Authorization'
import Layout from '../components/Layout'
import NotFound from "./NotFound"

//mentor pages
import MentorHome from './Mentor/Home'
import MentorProfile from './Mentor/Profile'
import MentorLecture from './Mentor/Lecture'
import MentorSchedule from './Mentor/Schedule'
import MentorStudentsRating from './Mentor/StudentsRating'
import MentorProjects from './Mentor/StudentsProjects'
import CreateLesson from './Mentor/CreateLesson'
import UpdateLesson from './Mentor/UpdateLesson'

//students pages
import StudentHome from './Student/Home'
import StudentProfile from './Student/Profile'
import StudentCourse from './Student/Course'
import StudentScores from './Student/Scores'
import StudentProject from './Student/Projects'
import LessonPage from './Student/Course/components/LessonPage'
import AwardsPage from './Student/Awards'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/mentor" element={<Layout />}>
          <Route path="home" element={<MentorHome />} />
          <Route path="profile" element={<MentorProfile />} />
          <Route path="lecture" element={<MentorLecture />} />
          <Route path="schedule" element={<MentorSchedule />} />
          <Route path="student-rating" element={<MentorStudentsRating />} />
          <Route path="student-projects" element={<MentorProjects />} />
          <Route path='create-lesson/lesson/:id' element={<CreateLesson/>}/>
          <Route path='update-lesson/lesson/:id' element={<UpdateLesson/>}/>
        </Route>

       <Route path="/student" element={<Layout />}>
          <Route path="home" element={<StudentHome />} />
          <Route path="schedule" element={<MentorSchedule />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="course" element={<StudentCourse />}/>
          <Route path='awards' element={<AwardsPage/>}/>
          <Route path="score" element={<StudentScores />} />
          <Route path="projects" element={<StudentProject />} />
          <Route path="course/lesson/:id" element={<LessonPage />}></Route>
        </Route>
       
      </Routes>
    </>
  )
}

export default Routing
