import Footer from "@components/common/Footer";
import Navbar from "@components/common/Navbar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <div className="bg-[#daf4f1]">
        <Navbar />
      </div>
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
