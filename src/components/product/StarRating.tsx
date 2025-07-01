
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({ 
  rating, 
  size = 16, 
  interactive = false, 
  onRatingChange 
}: StarRatingProps) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
        />
      ))}
    </div>
  );
};
