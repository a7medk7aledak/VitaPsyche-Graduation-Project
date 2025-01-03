import React from "react";
import { FaCrown, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface PremiumTestCardProps {
  title: string;
  testSlug: string; // أضف هذا
  questions: number;
  description?: string; // أضف هذا
  features?: string[]; // أضف هذا
  isPurchased?: boolean;
  price: number;
}

const PremiumTestCard: React.FC<PremiumTestCardProps> = ({
  title,
  testSlug,
  questions,
  description = "Professional psychological assessment",
  features = ["Detailed Analysis", "Expert Insights", "Comprehensive Report"],
  isPurchased = false,
  price,
}) => {
  const router = useRouter();

  const handlePurchase = () => {
    // Construct the query string manually
    const query = new URLSearchParams({
      title,
      testSlug,
      price: price.toString(),
    }).toString();

    // Push the full URL with the query string
    router.push(`/tests/premium/checkoutPremiumTest?${query}`);
  };

  return (
    <div className="border rounded-2xl shadow-lg p-6 bg-white flex flex-col justify-between relative group hover:shadow-xl transition-all duration-300">
      {/* Premium Badge */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-2 shadow-lg">
        <FaCrown className="text-white text-lg" />
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center">
          <img
            src="/images/testcardicon.png"
            alt="icon"
            className="h-8 w-8 mr-2"
          />
          <h2 className="text-xl font-semibold text-purple-800">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">{description}</p>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <FaCheck className="mr-1 text-green-500" />
            Professional Analysis
          </span>
          <span>{questions} questions</span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600"
            >
              <FaCheck className="mr-2 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handlePurchase}
        className={`w-full mt-4 block ${
          isPurchased
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        } text-white text-sm font-semibold rounded-lg px-4 py-3 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center`}
      >
        {isPurchased ? (
          <>
            Take Test
            <FaCheck className="ml-2" />
          </>
        ) : (
          <>
            Purchase & Take Test
            <FaCrown className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default PremiumTestCard;
