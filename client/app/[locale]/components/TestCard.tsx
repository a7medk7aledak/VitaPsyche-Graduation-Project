import { Link } from "@/i18n/navigation";

import React from "react";
import { useTranslations } from "next-intl";

interface TestCardProps {
  testId: string;
  title: string;
  questions: string;
}

const TestCard: React.FC<TestCardProps> = ({ testId, title, questions }) => {
  const t = useTranslations("tests");

  return (
    <div className="border rounded-2xl h-72 shadow-lg p-6 bg-white flex flex-col justify-between">
      <div className="flex items-center mb-4">
        {/* Icon next to title */}
        <img
          src="/images/testcardicon.png"
          alt="icon"
          className="h-8 w-8 me-2"
        />
        <h2 className="text-2xl font-semibold text-blue-800">{title}</h2>
      </div>

      <div className="flex justify-between text-lg text-gray-500 mb-4">
        <span>{t("testCard.frequency")}</span>
        <span>{questions}</span>
      </div>

      {/* Button to navigate to the test page */}
      <Link href={`/tests/${testId}`}>
        <button className="w-full bg-teal-400 text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-teal-500">
          {t("testCard.takeTest")}
        </button>
      </Link>
    </div>
  );
};

export default TestCard;
