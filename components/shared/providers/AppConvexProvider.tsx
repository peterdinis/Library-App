"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { FC, ReactNode } from "react";

type AppConvexProviderProps = {
	children?: ReactNode;
};

const convex = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL as unknown as string,
);

const AppConvexProvider: FC<AppConvexProviderProps> = ({
	children,
}: AppConvexProviderProps) => {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default AppConvexProvider;
