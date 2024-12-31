import type { FC } from "react";

type IGlobalErrorProps = {
	statusCode: string;
	message: string;
	linkHref?: string;
	linkText?: string;
};

const GlobalErrorComponent: FC<IGlobalErrorProps> = ({
	statusCode,
	message,
	linkHref,
	linkText,
}) => {
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center">
			<h1 className="dark:text-blue-50 text-9xl font-extrabold tracking-widest  text-black">
				{statusCode}
			</h1>
			<div className="mt-4px-2 absolute rotate-12 rounded bg-[#FF6A3D] text-sm">
				{message}
			</div>
			{!linkHref && !linkText ? (
				<></>
			): (
				<div className="mt-5">
				<button className="group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500">
					<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

					<span className="relative block border border-current bg-[#1A2238] px-8 py-3">
						<a href={linkHref!}>{linkText}</a>
					</span>
				</button>
			</div>
			)}
		</main>
	);
};

export default GlobalErrorComponent;
