"use client";

import { useTheme } from "@/hooks/useTheme";
import { BlockNoteSchema, defaultStyleSpecs, type Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { FormattingToolbar, FormattingToolbarController, useCreateBlockNote } from "@blocknote/react";
import { type FC, useEffect, useRef, useState } from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {
	commentStyleSpec,
	CommentToolbarController,
	CreateCommentButton,
  } from "@defensestation/blocknote-comments";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

	const schema = BlockNoteSchema.create({
		styleSpecs: {
		  // Adds all default styles.
		  ...defaultStyleSpecs,
		  comment: commentStyleSpec,
		},
	  });

	const editor = useCreateBlockNote({
		initialContent: [
			{
				type: "paragraph",
				content: "Začnite písať",
			},
		],
	});

	const CustomToolbar = () => (<FormattingToolbarController
		formattingToolbar={() => (
		  <FormattingToolbar>
			<CreateCommentButton key={"createCommentButtin"} />
		  </FormattingToolbar>
		)}
	  />)

	const blockNoteRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (blockNoteRef.current) {
			const editorElement = blockNoteRef.current.querySelector(
				".bn-editor",
			) as HTMLElement;
			if (editorElement) {
				editorElement.style.backgroundColor =
					theme === "dark" ? "#121212" : "#f2f2f2";
				editorElement.style.color = theme === "dark" ? "#ffffff" : "#000000";
			}
		}
	}, [theme]);

	return (
		<div ref={blockNoteRef}>
			<BlockNoteView
				onChange={() => setBlocks(editor.document)}
				editor={editor}
				formattingToolbar={false}
			>
				<CustomToolbar />
				<CommentToolbarController />
			</BlockNoteView>
		</div>
	);
};


export default Editor;