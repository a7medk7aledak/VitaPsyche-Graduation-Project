"use client";

import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import ProductDetailsCheckout from "@components/checkout/product-detailsCheckout";
import Heading from "@components/common/Heading";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { useState } from "react";
import { useCart } from "@hooks/useCart";

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const { totalPrice } = useCart();

  const closeModalHandler = () => {
    setShowModal(false);
    window.location.href = "/products";
  };
  return (
    <main className="py-16 min-h-screen">
      <div className="-mb-10">
        <Heading variant="secondary">Checkout</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          <ProductDetailsCheckout />
        </div>
        <div className="order-2 md:order-2">
          <PaymentMethods setShowModal={setShowModal} price={totalPrice} />
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
