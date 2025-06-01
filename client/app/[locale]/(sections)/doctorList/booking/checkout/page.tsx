"use client";
import withAuth from "@components/auth/WithAuth";
import { AppointmentDetails } from "@components/checkout/appointment-details";
import { CustomerSupport } from "@components/checkout/customer-support";
import { PaymentMethods } from "@components/checkout/payment-methods";
import Heading from "@components/common/Heading";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import SuccessfullModal from "@components/modals/SuccessfullModal";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import useAxios from "@hooks/useAxios";
import { convertToISO } from "@utils/dataTimeIso";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

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
  const axiosInstance = useAxios();
  const [appointmentData, setAppointmentData] =
    useState<IAppointmentData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get translations
  const t = useTranslations("appointmentCheckout");

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

  const handleContinue = async () => {
    if (!appointmentData) return;

    try {
      setIsSubmitting(true);

      const isoDateTime = convertToISO(
        appointmentData.date || "",
        appointmentData.time || ""
      );

      // Prepare appointment data with payment method
      const requestBody = {
        patient: appointmentData.patientId,
        doctor: appointmentData.doctorId,
        services: appointmentData.serviceId,
        date_time: isoDateTime,
        cost: String(appointmentData.price),
        notes: appointmentData.notes,
      };

      // Make direct API call to create appointment
      await axiosInstance.post("/api/appointments", requestBody);

      // Show success modal
      setShowModal(true);
    } catch (error) {
      toast.error(t("errors.appointmentCreation"));

      if (isAxiosError(error)) {
        // The server's processed error (from axiosErrorHandler) is now in err.response
        const { status, data } = error.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
    router.push("/doctorList");
  };

  if (isLoading) {
    return <SpinnerLoading message={t("loading")} />;
  }

  return (
    <main className="py-16 min-h-screen">
      <div className="-mb-10">
        <Heading variant="secondary">{t("title")}</Heading>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-1 md:order-1">
          <AppointmentDetails appointmentData={appointmentData} />
        </div>
        <div className="order-2 md:order-2">
          <PaymentMethods
            onContinue={handleContinue}
            price={appointmentData ? Number(appointmentData.price) : undefined}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
      <CustomerSupport />

      <SuccessfullModal
        isOpen={showModal}
        onClose={closeModalHandler}
        img="/images/payment-methods/submissionModal.png"
        message={t("successModal.message")}
      />
    </main>
  );
}

export default withAuth(CheckoutPage);
