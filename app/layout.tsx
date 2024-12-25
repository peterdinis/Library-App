import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/shared/ScrollToTop";
import AppConvexProvider from "@/components/shared/providers/AppConvexProvider";
import NextUiProvider from "@/components/shared/providers/NextUiProvider";
import { Toaster } from "react-hot-toast";
import Navigation from "../components/shared/Navigation";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
	title: "Spsť Knižnica",
	description: "Stránka školskej webovej knižnice",
	icons: [
		{
			rel: "icon",
			url: "https://www.spsbj.sk/wp-content/uploads/cropped-original-32x32.png",
		},
	],
} as Metadata;

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
