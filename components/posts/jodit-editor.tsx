/* Imports */
import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/*functions*/
export default function VisualEditor() {
  const editor = useRef(null); //declared a null value 
  const [content, setContent] = useState("Worlds best html page"); //declare using state

  /* The most important point*/
  const config = useMemo( //  Using of useMemo while make custom configuration is strictly recomended 
    () => ({              //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
      /* Custom image uploader button configuretion to accept image and convert it to base64 format */      
      height: '400px',
      name: 'description',
      uploader: {         
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
      },
    }),
    []
  );
  /* function to handle the changes in the editor */
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <>
    <JoditEditor 
            ref={editor}            //This is important
            value={content}         //This is important
            config={config}         //Only use when you declare some custom configs
            onChange={handleChange} //handle the changes
            className="w-full h-[600px] bg-white"
            />
    </>
  );
}