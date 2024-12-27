
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { FC, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const Editor: FC = () => {
  const [,setBlocks] = useState<Block[]>([]);
  const { theme } = useTheme();

  // Vytvorenie editora
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Začnite písať...!",
      },
    ],
  });

  // Dynamicky upravte pozadie na základe témy
  const editorStyles = {
    background: theme === "dark" ? "#121212" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
  };

  return (
    <div style={editorStyles}>
      <BlockNoteView
        onChange={() => setBlocks(editor.document)}
        editor={editor}
      />
    </div>
  );
};

export default Editor;
