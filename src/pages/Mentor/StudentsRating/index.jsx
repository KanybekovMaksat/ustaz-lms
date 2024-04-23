import { useState , useEffect} from 'react';
import ScoreTable from '../../../components/ScoreTable';
import ScoresService from '../../../services/ScoresService';

const MentorStudentsRating = () => {
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
  const courseId = sessionStorage.getItem("selectedCourseId");

  const getSchedule = async () => {
    try {
      const response = await ScoresService.getScores(courseId);
      setData(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getSchedule();
  }, []);

  const handleScoreChange = (studentId, lessonIndex, newScore) => {
    const newData = { ...data };
    newData.students = data.students.map((student) => {
      if (student.id === studentId) {
        const newScores = [...student.scores];
        newScores[lessonIndex] = parseInt(newScore, 10); 
        return { ...student, scores: newScores };
      }
      return student;
    });
    setData(newData);
  };

  console.log(data);
  return (
    <div className="content">
      <h2 style={{marginBottom:"20px"}}>Рейтинг студентов:</h2>
      {/* <ScoreTable  data={data} onScoreChange={handleScoreChange}/> */}
    </div>
  );
};

export default MentorStudentsRating;

