import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import { toast } from "react-toastify";
import LessonService from "../../../services/LessonService";



const UpdateLesson = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Введите название");
  const [content_html, setContentHtml] = useState("");

  const handleTextChange = (content) => {
    setContentHtml(content);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const getLecture = async () => {
    try {
      const response = await LessonService.getLesson(id);
      const { title, content_html } = response.data;
      setTitle(title);
      setContentHtml(content_html);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLecture();
  }, [id]);

  const deleteLesson = async () => {
    try {
      await LessonService.deleteLesson(id);
      toast.success("Урок успешно удален!");
    } catch (error) {
      console.log(error.response);
      toast.error("Не удалось удалить урок!")
    }
  };

  const updateLesson = async () => {
    try {
      await LessonService.updateLesson(id, { title, content_html });
      toast.success("Урок успешно обновлен!");
    } catch (error) {
      toast.error("Не удалось обновить урок!")
      console.log(error.response);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "4px",
        background: "blue",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      <Button onClick={deleteLesson} color="error" variant="contained">
        {loading ? "Deleting..." : "Удалить урок"}
      </Button>
      <TextField
        required
        focused
        id="outlined-required"
        label="Название урока"
        value={title}
        onChange={handleTitleChange}
      />
      <TextEditor content={content_html} onTextChange={handleTextChange} />
      <Button onClick={updateLesson} color="info" variant="contained">
        {loading ? "Updating..." : "Save Lesson"}
      </Button>
    </div>
  );
};

export default UpdateLesson;
