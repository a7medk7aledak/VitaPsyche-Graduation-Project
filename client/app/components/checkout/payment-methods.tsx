"use client";

import { useState } from "react";
import Image from "next/image";

type PaymentMethodsProps = {
  setShowModal: (value: boolean) => void;
  price: number;
};

const paymentOptions = [
  {
    id: "vitapsyche",
    label: "Vitapsyche Wallet",
    icon: "/images/payment-methods/vitapsycheWallet.png",
  },
  {
    id: "debit",
    label: "Debit Card",
    icons: [
      "/images/payment-methods/mastercard.png",
      "/images/payment-methods/visa.png",
      "/images/payment-methods/mesa.png",
    ],
  },
  {
    id: "digital",
    label: "Digital Wallet",
    icons: [
      "/images/payment-methods/we.png",
      "/images/payment-methods/orange.png",
      "/images/payment-methods/etisalat.png",
      "/images/payment-methods/vodafone.png",
      "/images/payment-methods/alahly.png",
    ],
  },
  {
    id: "credit",
    label: "Credit Card",
    icons: [
      "/images/payment-methods/mastercard.png",
      "/images/payment-methods/visa.png",
    ],
  },
];

export function PaymentMethods({ setShowModal, price }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState("credit");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1a1a3f] mb-6">Payment Method</h2>

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
                    width={36}
                    height={24}
                    className="h-6 object-contain"
                  />
                ))
              ) : (
                <Image
                  src={option.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              )}
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="w-full white rounded-xl py-4 mt-6 font-semibold transition-colors text-white bg-subbutton hover:bg-hoversubbutton "
      >
        Continue {price} EGP
      </button>
    </div>
  );
}
