"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

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
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [recommend, setRecommend] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //validation must be here (not validation not to user to fill the data ) but to not send the empty data to server
    //so if there is data send it to backend if not exit without sending data

    console.log({ rating, feedback, recommend });
    setIsReviewOpen(false);
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#1a1a3c]">Write a Review</h1>
        <p className="text-sm text-[#3b82f6]">
          Your opinion matters, tell us your experience with
        </p>
        <p className="text-lg font-medium text-[#1a1a3c]">{doctorName}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a3c]">
            How to rate your experience?
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
            Share your thoughts about your experience with us.
          </h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your review here..."
            className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />
          <p className="text-right text-sm text-[#1a1a3c]">
            Your feedback is valuable!
          </p>
        </div>

        {/* Recommendation */}
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a3c]">
            Would you recommend this Doctor to others?
          </h2>
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === "yes"}
                onChange={(e) => setRecommend(e.target.value)}
                className="w-4 h-4 text-blue-500"
              />
              <span>Yes, of course</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === "no"}
                onChange={(e) => setRecommend(e.target.value)}
                className="w-4 h-4 text-blue-500"
              />
              <span>No, I would not</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-subbutton hover:bg-hoversubbutton  rounded-lg text-lg transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
