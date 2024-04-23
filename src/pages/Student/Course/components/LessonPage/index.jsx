import {useEffect, useState} from 'react'
import './index.css'
import { useParams } from 'react-router-dom'
import ModuleService from '../../../../../services/ModuleService';

const LessonPage = () => {
  const {id} = useParams();
  const [htmlContent, setHtmlContent] = useState('');

  const getContent = async () => {
    try {
      const response = await ModuleService.getLecture(id);
      setHtmlContent(response.data)
    } catch (error) {
      console.log(error.response);
    }
  }
  
  console.log(htmlContent);
  useEffect(() => {
    getContent()
  },[])

  
  return (
    <section className="lesson-page">
      <h2>{htmlContent.title}</h2>
      <div className="lp-content" dangerouslySetInnerHTML={{ __html: htmlContent.content_html }}/>
    </section>
  )
}

export default LessonPage
