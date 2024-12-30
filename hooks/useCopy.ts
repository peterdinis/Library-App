"use client";

import type { CopiedValue, CopyFn } from "@/types/HookTypes";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);
	const { toast } = useToast();
	const copy: CopyFn = useCallback(async (text) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			toast({
				title: "Skopirované",
				className: "bg-green-800 text-white font-bold text-xl",
			});
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			toast({
				title: "Nepodarilo sa skopírovať",
				className: "bg-red-800 text-white font-bold text-xl",
			});
			return false;
		}
	}, []);

	return [copiedText, copy];
}
