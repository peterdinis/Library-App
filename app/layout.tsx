import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "../components/shared/Navigation";
import { NextUiProvider } from "../components/shared/providers/NextUiProvider";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
	title: "SPŠT Knižnica",
	description:
		"Applikácia na správu knižnice na strednej priemyselnej škole technickej v Bardejove",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<NextUiProvider>
					<ThemeProvider>
						<Navigation />
						{children}
						<Toaster />
					</ThemeProvider>
				</NextUiProvider>
			</body>
		</html>
	);
}
