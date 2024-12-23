import type { Metadata } from "next";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "react-hot-toast";
import Navigation from "../components/shared/Navigation";
import { NextUiProvider } from "../components/shared/providers/NextUiProvider";
import { ThemeProvider } from "../context/ThemeContext";

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
	const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

	return (
		<html lang="en">
			<body className={`antialiased`}>
				<NextUiProvider>
					<ConvexProvider client={convex}>
						<ThemeProvider>
							<Navigation />
							{children}
							<Toaster />
						</ThemeProvider>
					</ConvexProvider>
				</NextUiProvider>
			</body>
		</html>
	);
}
