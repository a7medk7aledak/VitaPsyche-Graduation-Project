"use client";

import { AppointmentDetails } from "@components/checkout/appointment-details";
import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import Heading from "@components/common/Heading";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { useState } from "react";

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const closeModalHandler = () => {
    setShowModal(false);
    window.location.href = "/doctorList";
  };
  return (
    <main className="py-16 min-h-screen">
      <div className="-mb-10">
        <Heading variant="secondary">Checkout</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          <AppointmentDetails />
        </div>
        <div className="order-2 md:order-2">
          <PaymentMethods setShowModal={setShowModal} />
        </div>
      </div>

      <CustomerSupport />

      {/* Modal Component */}
      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/payment-methods/submissionModal.png"
        message="Payment has been successfully completed. Thank you!"
      />
    </main>
  );
}
