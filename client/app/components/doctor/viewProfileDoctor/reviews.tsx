import { FaStar } from "react-icons/fa";
import { RenderStars } from "./renderStars";

interface IReview {
  id: number;
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Patient Reviews
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-4xl font-bold text-gray-800">
            {reviewsStats.average}
          </div>
          <RenderStars average={reviewsStats.average} />{" "}
          <span className="text-gray-600 ml-2">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b last:border-0 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                      size={16}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(review.created_at)}
                </span>
              </div>

              {review.comment && (
                <p className="text-gray-700 mt-2">{review.comment}</p>
              )}

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    review.is_positive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {review.is_positive ? "Recommended" : "Not Recommended"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
