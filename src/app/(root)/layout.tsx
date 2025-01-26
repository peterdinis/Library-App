import { ReactNode } from "react";
import Header from "../_components/shared/Header";

const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <main>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default Layout;