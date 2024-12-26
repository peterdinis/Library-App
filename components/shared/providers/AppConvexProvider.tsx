"use client"

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import type { FC, ReactNode } from "react";
import { ClerkProvider, useAuth} from '@clerk/nextjs'

type AppConvexProviderProps = {
	children?: ReactNode
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as unknown as string);

const AppConvexProvider: FC<AppConvexProviderProps> = ({children}: AppConvexProviderProps) => {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}

export default AppConvexProvider