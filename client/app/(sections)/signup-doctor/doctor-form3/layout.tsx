import Navbar from "@components/common/Navbar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="bg-[#daf4f1] min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
