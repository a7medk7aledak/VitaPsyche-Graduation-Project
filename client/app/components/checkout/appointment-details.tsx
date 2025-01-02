"use client";
import Image from "next/image";
import { useState } from "react";

export function AppointmentDetails() {
  const [coupon, setCoupon] = useState("");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md ">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/images/about-us/me.jpg"
          alt="Doctor profile"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h2 className="font-bold text-[#1a1a3f]">
            WASSIM ASHRAF | <span className="text-blue-600">PSYCHOLOGIST</span>
          </h2>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/payment-methods/date.png"
            alt="Calendar"
            width={24}
            height={24}
          />
          <span className="text-[#1a1a3f] font-medium">
            Tomorrow, Oct. 8 (12:00 AM : 12:30 AM)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="/images/payment-methods/money.png"
            alt="Price"
            width={24}
            height={24}
          />
          <span className="text-[#1a1a3f] font-medium">1520 EGP</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00978c]"
        />
        <button
          className="px-6 py-3 bg-[#00978c] block ml-auto text-white rounded-xl font-medium  transition-colors disabled:opacity-40"
          disabled={!coupon}
        >
          Apply
        </button>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-[#1a1a3f]">
          <span>Session fees</span>
          <span className="font-medium">1520 EGP</span>
        </div>
        <div className="flex justify-between text-[#1a1a3f]">
          <span>Administrative fees</span>
          <span className="font-medium">30 EGP</span>
        </div>
        <div className="flex justify-between text-[#1a1a3f] font-bold pt-2 border-t">
          <span>Total amount</span>
          <span>1550 EGP</span>
        </div>
      </div>
    </div>
  );
}
