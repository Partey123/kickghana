
import { ReviewItem } from "./ReviewItem";
import { Review } from "./RatingsAndReviews";

interface ReviewsListProps {
  reviews: Review[];
  helpfulMarked: string[];
  onMarkHelpful: (reviewId: string) => void;
}

export const ReviewsList = ({ reviews, helpfulMarked, onMarkHelpful }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          isHelpfulMarked={helpfulMarked.includes(review.id)}
          onMarkHelpful={onMarkHelpful}
        />
      ))}
    </div>
  );
};
