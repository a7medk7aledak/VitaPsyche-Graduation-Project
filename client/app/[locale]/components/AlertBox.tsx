"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AlertBox = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const t = useTranslations("alertBox");

  // Ensure the component works only in the browser environment
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setShowAlert(true);
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [isMounted]);

  const redirectToLina = () => {
    if (isMounted) {
      router.push("/lina");
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  if (!isMounted || !showAlert) return null;

  return (
    <div className="fixed bottom-5  end-5 w-72 border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-lg text-center z-10 transition-all duration-300 ease-in-out">
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/images/Capture.jpeg"
            alt="Lina"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <p className="mb-4 text-base font-bold">{t("title")}</p>
      <div className="flex justify-center space-x-2 rtl:space-x-reverse">
        <button
          onClick={redirectToLina}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white border-none rounded cursor-pointer text-sm transition-colors duration-300"
        >
          {t("goToLina")}
        </button>
        <button
          onClick={closeAlert}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white border-none rounded cursor-pointer text-sm transition-colors duration-300"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
