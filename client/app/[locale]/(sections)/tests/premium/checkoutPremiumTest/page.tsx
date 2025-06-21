"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { useTranslations } from "next-intl";
import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import Heading from "@components/common/Heading";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { addPurchasedTest } from "@store/authSlice";
import { useDispatch } from "react-redux";
import withAuth from "@components/auth/WithAuth";

// Main CheckoutPage component
function CheckoutPage() {
  const t = useTranslations("testsCheckout");
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams for App Router
  const [showModal, setShowModal] = useState(false);
  const [coupon, setCoupon] = useState("");

  const title = searchParams?.get("title");
  const testId = searchParams?.get("testId");
  const price = parseInt(searchParams?.get("price") || "0");

  const handleContinue = async () => {
    if (testId) {
      dispatch(addPurchasedTest(testId));
    }
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    // إعادة التوجيه إلى صفحة الاختبار
    router.push(`/tests/premium/${testId}`);
  };

  return (
    <main className="py-16 min-h-screen bg-gray-50">
      <div className="mb-10 text-center">
        <Heading variant="secondary">{t("pageTitle")}</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Premium Test Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md order-1 md:order-1">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
            {t("premiumTest.sectionTitle")}
          </h2>
          <div className="mt-6 space-y-6">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#00978c]">
                {t("premiumTest.testName")}:
              </span>{" "}
              {title}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#00978c]">
                {t("premiumTest.price")}:
              </span>{" "}
              ${price}
            </p>
          </div>
          <div className="mt-8">
            <label
              htmlFor="coupon"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              {t("coupon.label")}
            </label>
            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                placeholder={t("coupon.placeholder")}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00978c]"
              />
              <button
                className="px-6 py-3 bg-[#00978c] block ms-auto text-white rounded-xl font-medium transition-colors disabled:opacity-40"
                disabled={!coupon}
              >
                {t("coupon.applyButton")}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="order-2 md:order-2">
          <PaymentMethods onContinue={handleContinue} price={price} />{" "}
        </div>
      </div>

      <CustomerSupport />

      {/* Modal Component */}
      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/payment-methods/submissionModal.png"
        message={t("paymentSuccess")}
      />
    </main>
  );
}

// Default export with Suspense wrapping
const CheckoutPageWithSuspense = () => {
  const t = useTranslations("testsCheckout");

  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <CheckoutPage />
    </Suspense>
  );
};

export default withAuth(CheckoutPageWithSuspense);
