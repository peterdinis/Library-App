"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Switch
			checked={theme === "dark"}
			onChange={toggleTheme}
			size="lg"
			color="primary"
			startContent={<SunIcon />}
			endContent={<MoonIcon />}
		/>
	);
};

export default ThemeToggle;
