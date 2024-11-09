// components/TinyEditor.tsx
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Editor as TinyMCEEditor } from 'tinymce'; // TypeScript support for TinyMCE
import { EditorProps } from '@tinymce/tinymce-react';


// Dynamically import the TinyMCE editor to prevent SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });

interface TinyEditorProps {
  initialValue?: string;
  onEditorChange: (content: string) => void;
}

const TinyEditor = ({field} : any) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <>    
    <Editor            
      // initialize the configs here
      onInit={(evt, editor) => (editorRef.current = editor)}      
      apiKey="vkrts1fistxm6f1g7yq0ie63jxnchvrgxlv961doyktk5f4l"
      initialValue={''}
      init={{        
        url: 'https://cdn.tiny.cloud/1/vkrts1fistxm6f1g7yq0ie63jxnchvrgxlv961doyktk5f4l/tinymce/5/tinymce.min.js', // Add this line to specify version
        height: 500,
        width: '100%',
        placeholder: 'Your thoughts now can dream in HTML, cool huh?',
        menubar: false,        
        toolbar:
          'undo redo | formatselect | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      onEditorChange={(content) => field.onChange(content)}
    />
    </>
  );
};

export default TinyEditor;