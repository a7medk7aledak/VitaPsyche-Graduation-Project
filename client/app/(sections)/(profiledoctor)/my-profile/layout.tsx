import Navbar from "@components/common/Navbar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow">{children}</main>
      {/* Footer */}
    </div>
  );
};

export default layout;
