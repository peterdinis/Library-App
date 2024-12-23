"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { FC, ReactNode } from "react";

type AppConvexProviderProps = {
  children?: ReactNode;
};

const AppConvexProvider: FC<AppConvexProviderProps> = ({
  children,
}: AppConvexProviderProps) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};

export default AppConvexProvider;
