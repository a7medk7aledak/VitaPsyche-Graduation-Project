interface RatingItem {
  label: string;
  score: number;
}

export function Ratings() {
  const ratings: RatingItem[] = [
    { label: "Communication", score: 3.68 },
    { label: "Understanding of the situation", score: 4.7 },
    { label: "Providing effective solutions", score: 3 },
    { label: "Commitment to start and end times", score: 4 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Rating
      </h2>
      <div className="space-y-4 max-w-[400px]">
        {ratings.map((rating, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className=" font-medium text-gray-60">{rating.label}</span>
              <span>{rating.score}</span>
            </div>
            <div className="h-5 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#65cdae] to-[#007991] transition-all duration-700 ease-in-out"
                style={{ width: `${(rating.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
