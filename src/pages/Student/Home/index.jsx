import CourseCard from '../../../components/CourseCard'
import NewsList from '../../../components/NewsList'
import './index.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses, selectCourses, selectLoading, selectError} from "../../../slices/CourseSlice"

const StudentHome = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user.student_courses) {
      dispatch(fetchAllCourses(user.student_courses));
    }
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <section className="student-home">
      <div className="sh__content">
        <div className="sh__courses">
          <h2 style={{ margin: "30px 0px" }}>Мои курсы</h2>
          <div className="sh__courses-card">
          {courses && courses.map((data) => (
    <CourseCard key={data.id} data={data} />
  ))}
          </div>
        </div>
        <div className="sh__tasks">
          <h2 style={{ margin: "30px 0px" }}>Новости</h2>
          <div className="sh__news">
            <NewsList />
          </div>

        </div>
      </div>
    </section>
  )
}

export default StudentHome
