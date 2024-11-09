// components/JoditEditor.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Editor } from 'jodit-react';

interface JoditEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const JoditEditorComponent: React.FC<JoditEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      const newEditor = new Editor(editorRef.current, {
        value,
        events: {
          change: () => onChange(editor.getEditorValue()),
        },
      });
      setEditor(newEditor);
    }
  }, [editorRef]);

  return <>
    <div ref={editorRef} />
  </>;
};

export default JoditEditorComponent;
