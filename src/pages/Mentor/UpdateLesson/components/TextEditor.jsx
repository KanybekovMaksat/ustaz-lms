import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image", "blockquote", "code-block"],
];

const TextEditor = ({ onTextChange, content }) => {
  const wrapperRef = useRef(null);
  const quillRef = useRef(null);
  const [isQuillInitialized, setIsQuillInitialized] = useState(false);

  const handleImageInsertion = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const response = await axios.post('http://localhost:8000/api/course/image-upload/', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          const range = quillRef.current.getSelection();
          const imageUrl = response.data.image;
          quillRef.current.clipboard.dangerouslyPasteHTML(
            range.index,
            `<img src="${imageUrl}" alt="image" />`
          );
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    };
  };
  
  
  useEffect(() => {
    if (wrapperRef.current && !isQuillInitialized) {
      const editor = document.createElement("div");
      wrapperRef.current.innerHTML = "";
      wrapperRef.current.append(editor);

      const quill = new Quill(editor, {
        theme: "snow",
        modules: { 
          toolbar: {
            container: TOOLBAR_OPTIONS,
            handlers: {
              image: handleImageInsertion,
            }
          }
        },
      });

  
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        onTextChange(content);
      });

      quillRef.current = quill;
      setIsQuillInitialized(true);
    }
  }, [onTextChange, isQuillInitialized]);

useEffect(() => {
    if (quillRef.current && !quillRef.current.root.innerHTML) {
      console.log("Pasting HTML:", onTextChange);
      quillRef.current.clipboard.dangerouslyPasteHTML(onTextChange);
    }
}, [onTextChange]);

useEffect(() => {
  if (quillRef.current && quillRef.current.root.innerHTML !== content) {
    quillRef.current.clipboard.dangerouslyPasteHTML(content);
  }
}, [content]);



  return <div ref={wrapperRef} style={{ overflowY: "auto" }} />;
};

export default TextEditor;
