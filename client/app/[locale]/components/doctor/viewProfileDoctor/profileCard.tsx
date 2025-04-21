// components/doctor/viewProfileDoctor/profileCard.tsx
"use client";
import { memo, useState } from "react";
import Button from "@components/common/Button";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiTimeSynchronization } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa";
import ReviewForm from "./reviewForm";
import Link from "next/link";
import { IDoctor } from "./profileTypes";
import { getInitial } from "@utils/doctorUtils";
import { RenderStars } from "./renderStars";
import { toast } from "react-hot-toast"; // Import toast from your toast library
import { useSearchParams } from "next/navigation";

interface ProfileCardProps {
  doctorData: IDoctor;
  reviewsStats: { average: number; count: number };
  canReview?: boolean;
}

const ProfileCardBase = ({
  doctorData,
  reviewsStats,
  canReview,
}: ProfileCardProps) => {
  const searchParams = useSearchParams();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const serviceId = searchParams?.get("serviceId");
  const {
    first_name,
    last_name,
    doctor_details,
    nationality,
    fluent_languages,
    image,
  } = doctorData;

  const fullName = `${first_name} ${last_name}`;
  const doctorInitial = getInitial(fullName);

  const handleReviewClick = () => {
    if (!canReview) {
      toast.error("You cannot write a review for your own profile");
    } else {
      setIsReviewOpen(true);
    }
  };

  const imageUrl = `https://abdokh.pythonanywhere.com/${image}`;
  return (
    <div className="relative w-[500px] bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        {image ? (
          <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded-full border">
            <Image
              src={imageUrl}
              alt={fullName || "Doctor"}
              width={64}
              height={64}
              quality={100}
              priority
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div
            className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-2xl font-bold shadow-md bg-gray-200 text-gray-600`}
          >
            {doctorInitial}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{fullName}</h1>
          <p className="text-gray-600">{doctor_details.specialization}</p>
          <div className="flex items-center space-x-2">
            <RenderStars average={reviewsStats.average} />{" "}
            <span className="text-sm text-gray-500 ">
              {reviewsStats.average} ({reviewsStats.count} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <GrLanguage />
          <span className="text-gray-600">
            Language: {fluent_languages.replace(/[\[\]']/g, "")}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <FaGlobe />
          <span className="text-gray-600">Country: {nationality}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaRegCalendarAlt />
          <span className="text-gray-600">
            Experience: {doctor_details.years_of_experience} years
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <GiTimeSynchronization />
          <span className="text-gray-600">
            Clinic: {doctor_details.clinic_name}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-8">
        <button
          className="text-lg font-medium text-subheading hover:underline"
          onClick={handleReviewClick}
        >
          Write a review
        </button>
        <Link
          href={`/doctorList/booking?serviceId=${serviceId}&doctorId=${doctorData.doctor_details.id}`}
        >
          <Button variant="secondary" size="large" roundedValue="md">
            Select Time Slot
          </Button>
        </Link>
      </div>

      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <button
              className="absolute top-3 right-3 text-3xl text-gray-600 hover:text-gray-800"
              onClick={() => setIsReviewOpen(false)}
            >
              ✕
            </button>
            <ReviewForm
              doctorName={fullName}
              setIsReviewOpen={setIsReviewOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const ProfileCard = memo(ProfileCardBase);
ProfileCard.displayName = "ProfileCard";
