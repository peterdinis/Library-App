"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import type { Dispatch, FC, SetStateAction } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface AppEditorProps {
  name?: string;
  control?: any;
  defaultValue?: string;
  editorState?: EditorState | null;
  setEditorState?: Dispatch<SetStateAction<EditorState | null>>;
}

const AppEditor: FC<AppEditorProps> = ({
  name = "editor",
  control,
  defaultValue,
  editorState: externalEditorState,
  setEditorState: externalSetEditorState
}) => {
  const [internalEditorState, setInternalEditorState] = useState(() =>
    defaultValue
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)))
      : EditorState.createEmpty()
  );

  const editorState =
    externalEditorState !== undefined
      ? externalEditorState || EditorState.createEmpty()
      : internalEditorState;

  const handleEditorChange = (state: EditorState) => {
    if (externalSetEditorState) {
      externalSetEditorState(state);
    } else {
      setInternalEditorState(state);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      if (!externalSetEditorState) {
        setInternalEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)))
        );
      }
    }
  }, [defaultValue, externalSetEditorState]);

  const toolbarOptions = {
    options: [
      "inline", "blockType", "fontSize", "fontFamily", "list", "textAlign",
      "colorPicker", "link", "embedded", "emoji", "image", "remove",
      "history"
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript", "subscript"],
    },
    blockType: {
      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"],
    },
    fontSize: {
      options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72],
    },
    fontFamily: {
      options: ["Arial", "Georgia", "Impact", "Tahoma", "Times New Roman", "Verdana"],
    },
    list: {
      options: ["unordered", "ordered", "indent", "outdent"],
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
    },
    colorPicker: {
      colors: ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
    },
    link: {
      options: ["link", "unlink"],
      defaultTargetOption: "_blank",
    },
    embedded: {
      defaultSize: {
        height: "auto",
        width: "100%",
      },
    },
    emoji: {
      emojis: ["😀", "😂", "😎", "👍", "💡", "🚀", "🔥", "🎉", "❤️", "✅"],
    },
    image: {
      uploadCallback: async (file: File) => {
      },
      previewImage: true,
      alt: { present: true, mandatory: false },
    },
    remove: {},
    history: {
      options: ["undo", "redo"],
    },
  };
  

  if (!control) {
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={toolbarOptions}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <Editor
          editorState={editorState}
          onEditorStateChange={(state) => {
            handleEditorChange(state);
            field.onChange(JSON.stringify(convertToRaw(state.getCurrentContent())));
          }}
          toolbar={toolbarOptions}
        />
      )}
    />
  );
};

export default AppEditor;
