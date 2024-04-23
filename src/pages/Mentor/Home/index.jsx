import React              from 'react'
import CourseCard from '../../../components/CourseCard'
import NewsList from '../../../components/NewsList'
import { useSelector } from 'react-redux'
import { selectCourses } from '../../../slices/CourseSlice'

const MentorHome = () => {
  const courses = useSelector(selectCourses);
  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Курсы</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", }}>
        {courses && courses.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </div>
      <h2 style={{ margin: "20px 0px" }}>
        Новости
      </h2>
      <NewsList />
    </>
  )
}

export default MentorHome;