"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type PaymentMethodsProps = {
  onContinue: (paymentMethod: string) => void;
  price?: number;
  isSubmitting?: boolean;
};

const PaymentMethods = ({
  onContinue,
  price,
  isSubmitting,
}: PaymentMethodsProps) => {
  const t = useTranslations("checkout.payment"); // Initialize translations
  const [selectedMethod, setSelectedMethod] = useState("credit");

  const paymentOptions = [
    {
      id: "vitapsyche",
      label: t("methods.vitapsycheWallet"),
      icon: "/images/payment-methods/vitapsycheWallet.png",
    },
    {
      id: "digital",
      label: t("methods.digitalWallet"),
      icons: [
        "/images/payment-methods/orange.png",
        "/images/payment-methods/etisalat.png",
        "/images/payment-methods/vodafone.png",
      ],
    },
    {
      id: "credit",
      label: t("methods.creditCard"),
      icons: [
        "/images/payment-methods/mastercard.png",
        "/images/payment-methods/visa.png",
      ],
    },
  ];

  const handleSubmit = () => {
    onContinue(selectedMethod);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">
      <h2 className="text-2xl font-bold text-[#1a1a3f] mb-6">{t("title")}</h2>

      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors
              bg-gray-100 text-[#1a1a3f] 
              `}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={selectedMethod === option.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-5 h-5 "
              />
              <span className="font-medium">{option.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {option.icons ? (
                option.icons.map((icon, index) => (
                  <Image
                    key={index}
                    src={icon}
                    alt=""
                    width={30}
                    height={30}
                    className="h-6 object-contain"
                  />
                ))
              ) : (
                <Image
                  src={option.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="h-6 w-6 object-contain"
                />
              )}
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full white rounded-xl py-4 mt-6 font-semibold transition-colors text-white bg-subbutton hover:bg-hoversubbutton disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t("processing") : `${t("continue")} ${price} EGP`}
      </button>
    </div>
  );
};

export { PaymentMethods };
