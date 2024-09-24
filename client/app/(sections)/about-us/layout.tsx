import Navbar from "@components/common/Navbar";
import Footer from "@components/common/Footer";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="bg-[#efefef] ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
