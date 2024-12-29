"use client";

import { useTheme } from "@/hooks/useTheme";
import { Block } from "@blocknote/core";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { type FC, useEffect, useRef } from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }: EditorProps) => {
  const { theme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: value 
      ? JSON.parse(value) as Block[]
      : [
          {
            type: "paragraph",
            content: "Začnite písať",
            props: {
              textAlignment: "left",
              backgroundColor: "default",
              textColor: "default"
            }
          },
        ],
  });

  // Add effect to handle content changes
  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        try {
          const blocks = editor.topLevelBlocks;
          const content = JSON.stringify(blocks);
          onChange(content);
        } catch (error) {
          console.error("Error serializing editor content:", error);
        }
      };

      // Subscribe to editor updates
      editor.onEditorContentChange(updateHandler);
    }
  }, [editor, onChange]);

  const blockNoteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editorElement = blockNoteRef.current?.querySelector(
      ".bn-editor"
    ) as HTMLElement | null;

    if (editorElement) {
      const backgroundColor = theme === "dark" ? "#121212" : "#f2f2f2";
      const textColor = theme === "dark" ? "#ffffff" : "#000000";

      editorElement.style.backgroundColor = backgroundColor;
      editorElement.style.color = textColor;
    }
  }, [theme]);

  return (
    <div ref={blockNoteRef} className="min-h-[200px] rounded-md overflow-hidden">
      <BlockNoteView 
        editor={editor}
        theme={{
          ...(theme === "dark" ? darkDefaultTheme : lightDefaultTheme),
        }}
      />
    </div>
  );
};


export default Editor;