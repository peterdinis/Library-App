"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";

type LoaderProps = {
  background?: string;
  width?: number;
  height?: number;
};

const Loader: FC<LoaderProps> = ({
  background,
  height,
  width,
}: LoaderProps) => {
  return (
    <>
      <Loader2
        className={`animate-spin w-${width} h-${height} bg-${background}`}
      />
    </>
  );
};

export default Loader;
