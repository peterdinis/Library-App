import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "~/components/ui/toaster";
import Header from "../_components/shared/Navigation";
import ScrollToTop from "../_components/shared/ScrollToTop";
import { ThemeProvider } from "../_components/shared/providers/theme-provider";

export const metadata: Metadata = {
	title: "SPŠT Knižnica Bardejov",
	description:
		"Oficiálna knižnica Strednej priemyselnej školy technickej v Bardejove. Prezrite si dostupné knihy, spravujte výpožičky a objavujte nové tituly.",
	keywords: [
		"SPŠT Knižnica",
		"Stredná priemyselná škola technická Bardejov",
		"knižnica Bardejov",
		"výpožičky kníh",
		"študentská knižnica",
		"SPŠT Bardejov",
	],
	authors: [{ name: "Peter Dinis" }],
	icons: [
		{
			rel: "icon",
			url: "https://www.spsbj.sk/wp-content/uploads/cropped-original-32x32.png",
		},
	],
	openGraph: {
		type: "website",
		url: "https://www.spsbj.sk/",
		title: "SPŠT Knižnica | Bardejov",
		description:
			"Navštívte oficiálnu knižnicu Strednej priemyselnej školy technickej v Bardejove. Prezrite si dostupné knihy, spravujte výpožičky a objavujte nové tituly.",
		siteName: "SPŠT Knižnica",
	},
	twitter: {
		card: "summary_large_image",
		site: "@spst_kniznica",
		title: "SPŠT Knižnica | Bardejov",
		description:
			"Oficiálna knižnica Strednej priemyselnej školy technickej v Bardejove. Prezrite si dostupné knihy, spravujte výpožičky a objavujte nové tituly.",
	},
};

const Layout = async ({ children }: { children: ReactNode }) => {
	return (
		<main>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Header />
				<div>
					{children}
					<Toaster />
					<ScrollToTop />
				</div>
			</ThemeProvider>
		</main>
	);
};

export default Layout;
