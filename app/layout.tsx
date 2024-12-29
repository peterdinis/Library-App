import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Toaster } from "@/components/shared/Toaster";
import AppConvexProvider from "@/components/shared/providers/AppConvexProvider";
import NextUiProvider from "@/components/shared/providers/NextUiProvider";
import Navigation from "../components/shared/Navigation";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
	title: "Spsť Knižnica - Školská webová knižnica",
	description: "Oficiálna stránka školskej webovej knižnice na SPŠT Bardejov. Nájdite knihy, zdroje a informácie rýchlo a jednoducho.",
	icons: [
		{
			rel: "icon",
			url: "https://www.spsbj.sk/wp-content/uploads/cropped-original-32x32.png",
		},
		{
			rel: "apple-touch-icon",
			url: "https://www.spsbj.sk/wp-content/uploads/cropped-original-180x180.png",
		},
	],
	creator: "Peter Dinis",
	keywords: [
		"školská knižnica",
		"SPŠT Bardejov",
		"knihy online",
		"študentské zdroje",
		"štúdium",
	],
	author: {
		name: "Peter Dinis",
		url: "https://www.linkedin.com/in/peter-dinis/",
	},
	openGraph: {
		title: "Spsť Knižnica - Školská webová knižnica",
		description: "Preskúmajte oficiálnu školskú webovú knižnicu SPS Banská Bystrica a získajte prístup k hodnotným študijným materiálom.",
		url: "https://www.spsbj.sk/kniznica",
		type: "website",
		images: [
			{
				url: "https://www.spsbj.sk/wp-content/uploads/library-cover.jpg",
				width: 1200,
				height: 630,
				alt: "Školská knižnica SPS Banská Bystrica",
			},
		],
		locale: "sk_SK",
		siteName: "Spsť Knižnica",
	},
	twitter: {
		card: "summary_large_image",
		site: "@spsbj",
		creator: "@PeterDinis",
		title: "Spsť Knižnica - Školská webová knižnica",
		description: "Objavte online knižnicu SPŠT Bardejov s modernými nástrojmi pre štúdium a učenie.",
		images: [
			{
				url: "https://www.spsbj.sk/wp-content/uploads/library-cover.jpg",
				alt: "Školská knižnica SPŠT Bardejov",
			},
		],
	},
	robots: "index, follow",
	themeColor: "#0056b3",
	charset: "UTF-8",
	language: "sk",
} as Metadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body>
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
