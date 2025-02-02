import { ReactNode } from "react";
import Header from "../_components/shared/Header";
import { ThemeProvider } from "../_components/shared/providers/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import ScrollToTop from "../_components/shared/ScrollToTop";

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
