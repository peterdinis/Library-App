import Link from "next/link";
import type { FC } from "react";

type GlobalErrorProps = {
  statusCode: string;
  message: string;
  linkHref: string;
  linkText: string;
};

const GlobalErrorComponent: FC<GlobalErrorProps> = ({
  statusCode,
  message,
  linkHref,
  linkText,
}) => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold tracking-widest text-black dark:text-blue-50">
        {statusCode}
      </h1>
      <div className="mt-4px-2 absolute rotate-12 rounded bg-[#FF6A3D] text-sm">
        {message}
      </div>
      <div className="mt-5">
        <button className="group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500">
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

          <span className="relative block border border-current bg-[#1A2238] px-8 py-3">
            <Link href={linkHref}>{linkText}</Link>
          </span>
        </button>
      </div>
    </main>
  );
};

export default GlobalErrorComponent;
