import Navbar from "@components/common/Navbar";
import Footer from "@components/common/Footer";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-backgroundcolor ">
        <Navbar />
      </div>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
