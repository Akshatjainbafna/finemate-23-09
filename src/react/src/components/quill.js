import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';
import React, { useEffect, useRef, useState } from "react";
import './quill.css';



export default function QuillEditor(){
    const [text, setText] = useState(null);
    const reactQuillRef = useRef();
    const newQuillRef = useRef();


    const checkCharacterCount = () => {
        console.log(reactQuillRef.current.unprivilegedEditor.getContents());
      };

    var modules =  {
        syntax: true,
        toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ align: [] }],
        ["formula"],
        ["clean"]
        ]
    }

    return  <div style={{width: '75vw', margin: 'auto', marginTop: '40vh'}}>
        <ReactQuill ref={reactQuillRef} onChange={setText} modules={modules} theme='bubble' placeholder="Content goes here..." />
            <div dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
}