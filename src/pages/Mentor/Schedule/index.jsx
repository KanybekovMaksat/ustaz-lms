import React, { useState, useEffect } from "react";
import ScheduleService from "../../../services/ScheduleService";
import Calendar from "./components/Calendar";
import Modal from "../../../components/Modal";
import { Button, TextField } from "@mui/material";

const MentorSchedule = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [lessons, setLessons] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const courseId = sessionStorage.getItem("selectedCourseId");

  const getSchedule = async () => {
    try {
      const response = await ScheduleService.getSchedule(courseId);
      setLessons(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const uniqueMonths = Array.from(
    new Set(lessons.map((data) => data.date.split("-")[1]))
  );

  const createSchedule = async () => {
    try {
      const newData = {
        title: title,
        description: "string",
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
        course: courseId,
      };
      const response = await ScheduleService.createSchedule(newData);
      setModal(false);
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      {user.role === "mentor" && (
        <Button color="info" onClick={() => setModal(true)} variant="contained">
          Добавить занятие
        </Button>
      )}
      {uniqueMonths.map((month) => {
        const firstLessonOfMonth = lessons.find(
          (data) => data.date.split("-")[1] === month
        );
        if (firstLessonOfMonth) {
          const year = firstLessonOfMonth.date.split("-")[0];
          return (
            <Calendar
              key={`${year}-${month}`}
              year={year}
              month={Number(month) - 1}
              lessons={lessons}
            />
          );
        }
        return null;
      })}
      {user.role === "mentor" && (
        <Modal active={modal} setActive={setModal}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ color: "black" }}>Добавить занятие</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название темы"
              style={{ padding: "15px", margin: "10px 0px" }}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ padding: "15px", margin: "10px 0px" }}
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ padding: "15px", margin: "10px 0px" }}
            />
            <TextField
              type="date"
              sx={{
                mb: 2,
                "& input": { color: "black", border: "1px solid black" },
                "&:hover": { borderColor: "none" },
              }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <Button variant="contained" color="info" onClick={createSchedule}>
              Сохранить занятие
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MentorSchedule;
