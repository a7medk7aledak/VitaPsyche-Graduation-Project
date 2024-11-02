import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center flex-shrink-0">
      <Image
        src="/images/logo.png"
        alt="Vitapsyche Logo"
        width={65}
        height={65}
      />
      <h2 className="text-2xl font-semibold  text-teal-700 ">Vitapsyche</h2>
    </Link>
  );
};

export default Logo;
