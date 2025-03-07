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
  editorState?: EditorState;
  setEditorState?: Dispatch<SetStateAction<EditorState>>;
}

const AppEditor: FC<AppEditorProps> = ({ name, control, defaultValue }) => {
  const [editorState, setEditorState] = useState(() =>
    defaultValue
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (defaultValue) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)))
      );
    }
  }, [defaultValue]);

  return (
    <Controller
      name={name!}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => {
        return (
          <Editor
            editorState={editorState}
            onEditorStateChange={(state) => {
              setEditorState(state);
              field.onChange(JSON.stringify(convertToRaw(state.getCurrentContent()))); // Update the form value
            }}
          />
        );
      }}
    />
  );
};

export default AppEditor;
