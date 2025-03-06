import "~/styles/globals.css";
import type { Metadata } from "next";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import ScrollToTop from "./_components/shared/ScrollToTop";
import { ThemeProvider } from "./_components/shared/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>
              {children}
              <ScrollToTop />
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
