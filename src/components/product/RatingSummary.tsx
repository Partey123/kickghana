
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { Review } from "./RatingsAndReviews";

interface RatingSummaryProps {
  reviews: Review[];
  onWriteReview: () => void;
}

export const RatingSummary = ({ reviews, onWriteReview }: RatingSummaryProps) => {
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100
      : 0
  }));

  return (
    <div className="md:w-1/3">
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <div className="mb-1">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-sm text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {ratingCounts.map(({ stars, count, percentage }) => (
          <div key={stars} className="flex items-center gap-2">
            <div className="w-12 text-sm font-medium">{stars} stars</div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="w-8 text-xs text-right">{count}</div>
          </div>
        ))}
      </div>

      <Button 
        onClick={onWriteReview} 
        className="mt-6 w-full"
      >
        Write a Review
      </Button>
    </div>
  );
};
