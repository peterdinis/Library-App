"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const AppEditor: FC = () => {
  return <Editor />;
};

export default AppEditor;
