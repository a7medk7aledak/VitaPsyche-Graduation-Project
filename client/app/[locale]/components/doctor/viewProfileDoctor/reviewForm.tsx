"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxios from "@hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useSearchParams } from "next/navigation";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

export interface ReviewFormProps {
  doctorName: string;
  setIsReviewOpen: (isOpen: boolean) => void;
}

export interface StarProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function Star({ filled, onClick, onMouseEnter, onMouseLeave }: StarProps) {
  return (
    <FaStar
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      size={32}
      color={filled ? "#93C5FD" : "#E5E7EB"}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      aria-label="Star rating"
    />
  );
}

export default function ReviewForm({
  doctorName,
  setIsReviewOpen,
}: ReviewFormProps) {
  const t = useTranslations("viewProfile.reviewForm");
  const searchParams = useSearchParams();

  const axiosInstance = useAxios();
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [recommend, setRecommend] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patientId = useSelector(
    (state: RootState) => state.auth.user?.patient_details?.id
  );

  const validateForm = () => {
    if (rating === 0) {
      setError(t("errors.noRating"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bodyOfRequest = {
        rating,
        comment: feedback.trim() || null,
        is_positive: recommend || null,
        patient: patientId,
        doctor: searchParams?.get("doctorId"),
      };
      const response = await axiosInstance.post("/api/reviews", bodyOfRequest);
      if (response.status === 201 || response.status === 200) {
        setIsReviewOpen(false);
      }
    } catch (err) {
      setError(t("errors.submitFailed"));

      if (isAxiosError(err)) {
        // The server's processed error (from axiosErrorHandler) is now in err.response
        const { status, data } = err.response || {
          status: 500,
          data: { message: "Unknown error occurred" },
        };
        console.error(`Error (${status}):`, data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#1a1a3c]">{t("title")}</h1>
        <p className="text-sm text-[#3b82f6]">{t("subtitle")}</p>
        <p className="text-lg font-medium text-[#1a1a3c]">{doctorName}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-red-500 bg-red-50 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a3c]">
            {t("ratingLabel")} <span className="text-red-500">*</span>
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoveredStar || rating)}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              />
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a3c]">
            {t("feedbackLabel")}
          </h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t("feedbackPlaceholder")}
            className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />
          <p className="text-right text-sm text-[#1a1a3c]">
            {t("feedbackFooter")}
          </p>
        </div>

        {/* Recommendation */}
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a3c]">
            {t("recommendLabel")}
          </h2>
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === "yes"}
                onChange={(e) => setRecommend(e.target.value)}
                className="w-4 h-4 text-blue-500"
              />
              <span>{t("recommendYes")}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === "no"}
                onChange={(e) => setRecommend(e.target.value)}
                className="w-4 h-4 text-blue-500"
              />
              <span>{t("recommendNo")}</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white bg-subbutton hover:bg-hoversubbutton rounded-lg text-lg transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
