import { FaStar } from "react-icons/fa";
import { RenderStars } from "./renderStars";
import { useState } from "react";
import { getInitial } from "@utils/doctorUtils";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";

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

interface ReviewsProps {
  reviews: IReview[];
  reviewsStats: { average: number; count: number };
}

const Reviews = ({ reviews, reviewsStats }: ReviewsProps) => {
  const t = useTranslations("viewProfile.reviews");
  const format = useFormatter();
  const [visibleReviews, setVisibleReviews] = useState(3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format.dateTime(date, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate a consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-cyan-500",
    ];

    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, reviews.length));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-6">
        <h2 className="text-2xl font-semibold text-subheading">{t("title")}</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-4xl font-bold text-maintext">
            {reviewsStats.average.toFixed(1)}
          </div>
          <div>
            <RenderStars average={reviewsStats.average} />
            <span className="text-paragraphtext text-sm block mt-1">
              {t("rating.average", { count: reviews.length })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {reviews.length === 0 ? (
          <div className="text-paragraphtext text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <p className="font-medium">{t("noReviews.title")}</p>
            <p className="text-sm mt-1">{t("noReviews.subtitle")}</p>
          </div>
        ) : (
          <>
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-8">
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(
                      review.patient_first_name
                    )}`}
                  >
                    {getInitial(review.patient_first_name)}
                  </div>

                  <div className="ms-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-primarytext">
                          {`${
                            review.patient_first_name
                          } ${review.patient_last_name.charAt(0)}.`}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={
                                  star <= review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                                size={14}
                              />
                            ))}
                          </div>
                          <span className="ms-2 text-sm text-paragraphtext">
                            {t("rating.outOf", { rating: review.rating })}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-paragraphtext whitespace-nowrap">
                        {formatDate(review.created_at)}
                      </span>
                    </div>

                    {review.comment && (
                      <div className="mt-3 text-paragraphtext bg-backgroundcolor p-4 rounded-lg border border-gray-100">
                        {review.comment}
                      </div>
                    )}

                    <div className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.is_positive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {review.is_positive
                          ? t("reviewItem.recommends")
                          : t("reviewItem.doesNotRecommend")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {visibleReviews < reviews.length && (
              <div className="text-center">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-main hover:bg-hoverbutton text-white font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center mx-auto space-x-2 rtl:space-x-reverse"
                >
                  <span>{t("showMore")}</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {t("remainingCount", {
                      count: reviews.length - visibleReviews,
                    })}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reviews;
