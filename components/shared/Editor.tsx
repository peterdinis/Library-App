"use client";

import { useTheme } from "@/hooks/useTheme";
import {
	type Block,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
	useCreateBlockNote,
} from "@blocknote/react";
import { type FC, useEffect, useRef, useState } from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const Editor: FC = () => {
	const [, setBlocks] = useState<Block[]>([]);
	const { theme } = useTheme();

	const editor = useCreateBlockNote({
		initialContent: [
			{
				type: "paragraph",
				content: "Začnite písať",
			},
		],
	});

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
			/>
		</div>
	);
};

export default Editor;
