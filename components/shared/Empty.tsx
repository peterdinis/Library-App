import { Ghost } from "lucide-react";
import type { FC } from "react";

type EmptyProps = {
	text: string;
};

const Empty: FC<EmptyProps> = ({ text }: EmptyProps) => {
	return (
		<div className="mt-6 flex justify-center align-top">
			<Ghost className="animate-ease-linear animate-normal animate-bounce w-10 h-10" />
			<p className="ml-3 text-xl font-bold">{text}</p>
		</div>
	);
};

export default Empty;
