import { ReactNode } from "react";
import Header from "../_components/shared/Header";
import { ThemeProvider } from "../_components/shared/providers/theme-provider";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div>
          <Header />
          <div>{children}</div>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Layout;
