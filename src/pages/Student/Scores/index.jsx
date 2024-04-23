import React, {useState} from 'react'
import ScoreTable from '../../../components/ScoreTable'
import { Line } from "react-chartjs-2"
import { Bar } from 'react-chartjs-2';
import "./index.css"
import { Chart as ChartJs } from "chart.js/auto"
import { useTheme, Button } from '@mui/material';

const StudentScores = () => {
  //testing data
  const students = [
    {
      id: 1,
      name: 'Иванов Иван',
      scores: [
        { lesson: 'Тема 1', score: 3 },
        { lesson: 'Тема 2', score: 7 },
        { lesson: 'Тема 3', score: 4 },
        { lesson: 'Тема 1', score: 3 },
        { lesson: 'Тема 2', score: 7 },
        { lesson: 'Тема 3', score: 4 },
        { lesson: 'Тема 1', score: 3 },
        { lesson: 'Тема 2', score: 7 },
        { lesson: 'Тема 3', score: 4 },
      ],
    },
    {
      id: 2,
      name: 'Петров Петр',
      scores: [
        { lesson: 'Тема 1', score: 7 },
        { lesson: 'Тема 2', score: 8 },
        { lesson: 'Тема 3', score: 5 },
      ],
    },
  ]
  
  const [data, setData] = useState(students)
  
  const lineChartData = {
    labels: data[0]?.scores.map((score) => score.lesson),
    datasets: [
      {
        label: 'Баллы студента Иванов Иван',
        data: data[0]?.scores.map((score) => score.score),
        fill: false,
        tension: 0.1,
      },
    ],
  };
  const handleScoreChange = (studentId, lessonIndex, newScore) => {
    const newData = { ...data }
    newData.students = data.students.map((student) => {
      if (student.id === studentId) {
        const newScores = [...student.scores]
        newScores[lessonIndex] = parseInt(newScore, 10)
        return { ...student, scores: newScores }
      }
      return student
    })
    setData(newData)
  }
  const theme = useTheme();
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.mode === "dark" ? "white" : 'black',
        },
      },
      x: {
        ticks: {
          color: theme.palette.mode === "dark" ? "white" : 'black',
        },
      },
    },
  };
  



  return (
    <div className="content">

        <div className="profileinfo">
          <h2>Мои метрики</h2>
          <div className="pwrapper">
          <div className="profile__info-metricks">
            <div className="profile__metric-card">
              <p className="pm__card-title">Место в рейтинге</p>
              <p className="pm__card-metric">1</p>
            </div>
            <div className="profile__metric-card">
              <p className="pm__card-title">Всего баллов</p>
              <p className="pm__card-metric">150</p>
            </div>
            <div className="profile__metric-card">
              <p className="pm__card-title">Всего проектов</p>
              <p className="pm__card-metric">1</p>
            </div>
          </div>
      <div style={{minWidth:"700px", maxWidth: "700px", display:"flex"}}>
          <Line data={lineChartData} options={options} />

        </div>
          </div>
        </div>
      <h2  style={{ margin: "50px 0px 20px 0px" }}>Мои баллы</h2>
      <ScoreTable data={data} onScoreChange={handleScoreChange} />


    </div>
  )
}
export default StudentScores
