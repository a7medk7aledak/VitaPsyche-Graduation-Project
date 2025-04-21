import Navbar from "@components/common/Navbar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="bg-[#dce9e6]">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
