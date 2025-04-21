import { Star } from "lucide-react";

interface RenderStarsProps {
  average: number;
}

export function RenderStars({ average }: RenderStarsProps) {
  const fullStars = Math.floor(average);
  const hasHalfStar = average - fullStars >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400" // Full star
              : hasHalfStar && i === fullStars
              ? "fill-yellow-400 text-yellow-400 opacity-50" // Half star effect
              : "text-gray-300" // Empty star
          }`}
        />
      ))}
    </div>
  );
}
