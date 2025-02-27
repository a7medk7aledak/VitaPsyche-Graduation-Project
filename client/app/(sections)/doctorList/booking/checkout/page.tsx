"use client";
import withAuth from "@components/auth/WithAuth";
import { AppointmentDetails } from "@components/checkout/appointment-details";
import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import Heading from "@components/common/Heading";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IAppointmentData {
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  endTime: string;
  duration: string;
  doctorName: string;
  categoryName: string;
  serviceName: string;
  price: string;
  notes?: string;
}

 function CheckoutPage() {
  const router = useRouter();
  const [appointmentData, setAppointmentData] =
    useState<IAppointmentData | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve data from sessionStorage
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("bookingData");

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setAppointmentData(parsedData);
        } catch (error) {
          console.error("Error parsing booking data:", error);
        }
      } else {
        // No data found in sessionStorage, redirect back to booking page
        router.push("/doctorList");
      }
    }

    setIsLoading(false);
  }, [router]);

  const closeModalHandler = () => {
    setShowModal(false);
    router.push("/doctorList");
  };

  if (isLoading) {
    return (
      <SpinnerLoading message="Just a moment! We're preparing your checkout details..." />
    );
  }

  return (
    <main className="py-16 min-h-screen">
      <div className="-mb-10">
        <Heading variant="secondary">Checkout</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          {/* Fixed: Pass appointmentData instead of doctorName */}
          <AppointmentDetails appointmentData={appointmentData} />
        </div>
        <div className="order-2 md:order-2">
          <PaymentMethods
            setShowModal={setShowModal}
            appointmentData={appointmentData}
          />
        </div>
      </div>
      <CustomerSupport />
      {/* Modal Component */}
      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/payment-methods/submissionModal.png"
        message="Your session has been successfully booked. Thank you!!"
      />
    </main>
  );
 }


 export default withAuth(CheckoutPage);

