import type { Metadata } from "next";
import "./globals.css";
import { NextUiProvider } from "./components/shared/providers/NextUiProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SPŠT Knižnica",
  description: "Applikácia na správu knižnice na strednej priemyselnej škole technickej v Bardejove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <NextUiProvider>
          {children}
          <Toaster />
        </NextUiProvider>
      </body>
    </html>
  );
}
