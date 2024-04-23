import {useState} from 'react';
import Modal from "../../../../../components/Modal"
import { format, getDay, startOfMonth, endOfMonth, eachDayOfInterval, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/material";
import { tokens } from "../../../../../theme";
import './index.css';
import ScheduleService from '../../../../../services/ScheduleService';
import {toast} from "react-toastify";

const week = [
  'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
]

const Calendar = ({ year, month, lessons }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modal, setModal] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const firstDayOfMonth = startOfMonth(new Date(year, month, 1));
  const lastDayOfMonth = endOfMonth(new Date(year, month, 1));
  const dates = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  let startDayOfWeek = getDay(firstDayOfMonth);
  startDayOfWeek = (startDayOfWeek === 0) ? 6 : startDayOfWeek - 1;

  const monthName = format(firstDayOfMonth, 'LLLL yyyy', { locale: ru });
  const openEditModal = (id, text, start, end) => {
    setModal(true);
    setLessonId(id)
    setTitle(text)
    setStartTime(start)
    setEndTime(end)
  };

  const closeEditModal = () => {
    setModal(false);
    setLessonId(null)
    setTitle("");
    setStartTime("")
    setEndTime("")
  };

  const changeSchedule = async () => {
    try {
      const newData = {
        title: title,
        start_time:startTime,
        end_time:endTime
      }
      const response = await ScheduleService.changeSchedule(lessonId, newData);
      toast.success("Успешно изменили занятие!")
      closeEditModal()
    } catch (error) {
      console.log(error.response);
      toast.success("Не получилось изменить занятие!")
    }
  }



  const deleteSchedule = async () => {
    try {
      await ScheduleService.deleteSchedule(lessonId)
      toast.success("Вы успешно удалили занятие!")
      closeEditModal()
    } catch (error) {
      console.log(error.response);
      toast.error("Не получилось удалить занятие!")
    }
  }



  return (
    <>
    <div className="lessons-calendar">
      <div className="calendar-header">
        <h2>{monthName.toUpperCase()}</h2>
      </div>
      <div className="days-of-week">
        {week.map((day) => (
          <div  className="day bold" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-dates">
        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div  className="day" key={`empty-${index}`}>
          </div>
        ))}
        {dates.map((date) => (
          <div className="day" key={date}>
            {format(date, 'd')}
            {lessons.map((lesson) => {
              if (lesson.date === format(date, 'yyyy-MM-dd')) {
                return (
                  <div key={lesson.id} className="lesson" style={{background:colors.blueAccent[700]}}>
                    <div className="lesson-header">
                      {lesson.start_time.slice(0, -3)} - {lesson.end_time.slice(0, -3)}
                      {user.role ==="mentor" ?  <EditIcon  sx={{ fontSize: 15 }} onClick={() => openEditModal(lesson.id, lesson.title, lesson.start_time, lesson.end_time)} className='lesson-dropdown' /> : null}
                    </div>
                    {lesson.title}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
    {
      user.role === "mentor" ?
      <Modal active={modal} setActive={closeEditModal}>
      <div className="" style={{display:"flex", flexDirection:"column"}}>
      <h3 style={{color:"black"}}>Добавить занятие</h3>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Название темы' style={{padding:"15px", margin:"10px 0px"}}/>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{padding:"15px", margin:"10px 0px"}} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{padding:"15px", margin:"10px 0px"}} />
      <button onClick={changeSchedule}>Сохранить занятие</button>
      <button onClick={deleteSchedule}>Удалить занятие</button>
      </div>
      </Modal> : null}
    </>
  );
};

export default Calendar;
