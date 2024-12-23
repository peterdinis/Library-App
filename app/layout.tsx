import type { Metadata } from "next";
import "./globals.css";
import AppConvexProvider from "@/components/shared/providers/AppConvexProvider";
import { Toaster } from "react-hot-toast";
import Navigation from "../components/shared/Navigation";
import { NextUiProvider } from "../components/shared/providers/NextUiProvider";
import { ThemeProvider } from "../context/ThemeContext";
import ScrollToTop from "@/components/shared/ScrollToTop";

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
					<AppConvexProvider>
						<ThemeProvider>
							<Navigation />
							{children}
							<ScrollToTop />
							<Toaster />
						</ThemeProvider>
					</AppConvexProvider>
				</NextUiProvider>
			</body>
		</html>
	);
}
