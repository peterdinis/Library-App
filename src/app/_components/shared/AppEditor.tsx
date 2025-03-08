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
    let isMounted = true;

    if (defaultValue && isMounted) {
      if (!externalSetEditorState) {
        setInternalEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue)))
        );
      }
    }

    return () => {
      isMounted = false; // Cleanup function to avoid updating state on an unmounted component
    };
  }, [defaultValue, externalSetEditorState]);

  if (!control) {
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ["inline", "blockType", "fontSize", "list", "textAlign", "history"],
        }}
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
          toolbar={{
            options: ["inline", "blockType", "fontSize", "list", "textAlign", "history"],
          }}
        />
      )}
    />
  );
};

export default AppEditor;
