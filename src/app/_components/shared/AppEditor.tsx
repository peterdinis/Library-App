"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Dispatch, FC, SetStateAction } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes"; // Import the useTheme hook

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  },
);

interface AppEditorProps<T extends FieldValues> {
  name?: string;
  control?: Control<T>;
  defaultValue?: string;
  editorState?: EditorState | null;
  setEditorState?: Dispatch<SetStateAction<EditorState | null>>;
}

const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "image",
    "remove",
    "history",
  ],
  inline: {
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  blockType: {
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
  },
  fontSize: {
    options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72],
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
  },
  list: {
    options: ["unordered", "ordered", "indent", "outdent"],
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
  colorPicker: {
    colors: [
      "#000000",
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
    ],
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
    uploadCallback: async (file: File) => {},
    previewImage: true,
    alt: { present: true, mandatory: false },
  },
  remove: {},
  history: {
    options: ["undo", "redo"],
  },
};

const AppEditor: FC<AppEditorProps<FieldValues>> = ({
  name = "editor",
  control,
  defaultValue,
  editorState: externalEditorState,
  setEditorState: externalSetEditorState,
}) => {
  const { theme } = useTheme(); // Get the current theme
  const [internalEditorState, setInternalEditorState] = useState<EditorState>(
    () =>
      defaultValue
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(defaultValue)),
          )
        : EditorState.createEmpty(),
  );

  const editorState = externalEditorState ?? internalEditorState;

  const handleEditorChange = (state: EditorState) => {
    if (externalSetEditorState) {
      externalSetEditorState(state);
    } else {
      setInternalEditorState(state);
    }
  };

  useEffect(() => {
    if (defaultValue && !externalSetEditorState) {
      setInternalEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(defaultValue))),
      );
    }
  }, [defaultValue, externalSetEditorState]);

  // Dynamically determine the editor style based on the theme
  const editorClass = theme === "dark" ? "editor-dark" : "editor-light";

  return (
    <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Editor
              editorState={editorState}
              onEditorStateChange={(state) => {
                handleEditorChange(state);
                field.onChange(
                  JSON.stringify(convertToRaw(state.getCurrentContent())),
                );
              }}
              toolbar={toolbarOptions}
              wrapperClassName={editorClass} // Apply dynamic class here
              editorClassName={editorClass} // Apply dynamic class here as well
            />
          )}
        />
      ) : (
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={toolbarOptions}
          wrapperClassName={editorClass} // Apply dynamic class here
          editorClassName={editorClass} // Apply dynamic class here
        />
      )}
    </Suspense>
  );
};

export default AppEditor;
