"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import Heading from "@components/common/Heading";
import SuccessfullModal from "@components/modals/SuccessfullModal";

// Main CheckoutPage component
function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams for App Router
  const [showModal, setShowModal] = useState(false);
  const [coupon, setCoupon] = useState("");

  const title = searchParams?.get("title");
  const testSlug = searchParams?.get("testSlug");
  const price = parseInt(searchParams?.get("price") || "0");

  const closeModalHandler = () => {
    setShowModal(false);
    router.push(`/tests/premium/${testSlug}`); // Redirect to the test
  };

  return (
    <main className="py-16 min-h-screen bg-gray-50">
      <div className="mb-10 text-center">
        <Heading variant="secondary">Checkout</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Premium Test Details Section */}
        <div className="order-1 md:order-1 bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
            Premium Test Details
          </h2>
          <div className="mt-6 space-y-6">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#00978c]">Test Name:</span>{" "}
              {title}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#00978c]">Price:</span> $
              {price}
            </p>
          </div>
          <div className="mt-8">
            <label
              htmlFor="coupon"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Coupon Code
            </label>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00978c] transition-all duration-300"
              />
              <button
                className="px-8 py-4 bg-[#00978c] text-white rounded-lg font-semibold hover:bg-[#007b74] transition-colors disabled:opacity-50"
                disabled={!coupon}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="order-2 md:order-2 bg-white p-8 rounded-lg shadow-lg">
          <PaymentMethods setShowModal={setShowModal} price={price} />
        </div>
      </div>

      <CustomerSupport />

      {/* Modal Component */}
      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/payment-methods/submissionModal.png"
        message="Payment completed successfully"
      />
    </main>
  );
}

// Default export with Suspense wrapping
const CheckoutPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
};

export default CheckoutPageWithSuspense;
