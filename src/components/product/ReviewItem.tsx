
import { Button } from "@/components/ui/button";
import { User, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import { Review } from "./RatingsAndReviews";

interface ReviewItemProps {
  review: Review;
  isHelpfulMarked: boolean;
  onMarkHelpful: (reviewId: string) => void;
}

export const ReviewItem = ({ review, isHelpfulMarked, onMarkHelpful }: ReviewItemProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b pb-6"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={16} />
          </div>
          <span className="font-medium">{review.userName}</span>
          {review.verified && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Verified Purchase
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDate(review.date)}
        </span>
      </div>

      <div className="mt-2">
        <StarRating rating={review.rating} />
      </div>

      <p className="mt-2 text-sm">{review.comment}</p>

      <div className="mt-3 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={() => onMarkHelpful(review.id)}
          disabled={isHelpfulMarked}
        >
          <ThumbsUp size={14} />
          {isHelpfulMarked ? "Helpful" : "Mark as helpful"}
          {review.helpful > 0 && <span>({review.helpful})</span>}
        </Button>
      </div>
    </motion.div>
  );
};
