import React, { useCallback, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image", "blockquote", "code-block"],
  ["clean"],
]

const TextEditor = () => {
  const wrapperRef = useCallback(wrapper => {
    if(wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })

  })
  return (
    <div  ref={wrapperRef} style={{maxHeight:"250px", maxWidth:"600px"}}></div>
  )
}

export default TextEditor;