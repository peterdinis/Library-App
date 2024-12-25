"use client";

import { NextUIProvider } from "@nextui-org/react";
import type { FC, ReactNode } from "react";

type NextUiProviderProps = {
	children?: ReactNode;
};

const NextUiProvider: FC<NextUiProviderProps> = ({
	children,
}: NextUiProviderProps) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUiProvider;
