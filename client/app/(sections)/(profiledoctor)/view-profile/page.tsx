"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Interests } from "@components/doctor/viewProfileDoctor/interests";
import { ProfileCard } from "@components/doctor/viewProfileDoctor/profileCard";
import { Ratings } from "@components/doctor/viewProfileDoctor/ratings";
import { Certificates } from "@components/doctor/viewProfileDoctor/certificates";
import Heading from "@components/common/Heading";
import useAxios from "@hooks/useAxios";
import { isAxiosError } from "axios";
import Reviews from "@components/doctor/viewProfileDoctor/reviews";
import { getReviewStats } from "@utils/doctorUtils";
import { IDoctor } from "@components/doctor/viewProfileDoctor/profileTypes";
import { useCheckDoctorPermissions } from "@hooks/useCheckDoctorPermissions";
import withAuth from "@components/auth/WithAuth";

interface IReview {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  rating: number;
  created_at: string;
  updated_at: string;
  comment?: string;
  is_positive: boolean;
  patient: number;
  doctor: number;
}

const DoctorProfilePage = () => {
  const router = useRouter();
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const [doctorData, setDoctorData] = useState<IDoctor | null>(null);
  const [reviewsData, setReviewsData] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get doctor ID from URL
  const doctorIdParam = searchParams?.get("doctorId");
  const doctorId = doctorIdParam ?? null;

  const { canReview, hasEditPermission } = useCheckDoctorPermissions(doctorId);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorId = searchParams?.get("doctorId");
        if (!doctorId) {
          router.push("/doctorList");
          return; // Early return to prevent the API calls
        }

        // Fetch both doctor data and reviews in parallel
        const [doctorResponse, reviewsResponse] = await Promise.all([
          axiosInstance.get(`/api/doctorData?doctorId=${doctorId}`),
          axiosInstance.get(`/api/reviews?doctorId=${doctorId}`),
        ]);

        setDoctorData(doctorResponse.data);
        setReviewsData(reviewsResponse.data);
      } catch (error) {
        if (isAxiosError(error)) {
          // The server's processed error (from axiosErrorHandler) is now in err.response
          const { status, data } = error.response || {
            status: 500,
            data: { message: "Unknown error occurred" },
          };
          console.error(`Error (${status}):`, data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No doctor data found</p>
      </div>
    );
  }

  const reviewsStats = getReviewStats(reviewsData); ///get average and count of reviews

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
      <Heading variant="secondary">Therapist Profile</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 -mt-6">
        <div className="space-y-6 order-2 md:order-1">
          <Interests category={doctorData.doctor_details.specialization} />
          <Ratings />
          <Certificates
            hasEditPermission={hasEditPermission}
            doctorId={doctorId}
          />
          <Reviews reviews={reviewsData} reviewsStats={reviewsStats} />
        </div>
        <div className="md:sticky md:top-6 h-fit order-1 md:order-2 flex md:justify-center">
          <ProfileCard
            doctorData={doctorData}
            reviewsStats={reviewsStats}
            canReview={canReview}
          />
        </div>
      </div>
    </main>
  );
};

function viewProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorProfilePage />
    </Suspense>
  );
}

export default withAuth(viewProfilePage);
