
import { useState } from "react";
import { RatingSummary } from "./RatingSummary";
import { ReviewsList } from "./ReviewsList";
import { ReviewForm } from "./ReviewForm";

export interface Review {
  id: string;
  productId: string | number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface RatingsAndReviewsProps {
  productId: string | number;
  initialReviews?: Review[];
}

export function RatingsAndReviews({ productId, initialReviews = [] }: RatingsAndReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAddReview, setShowAddReview] = useState(false);
  const [helpfulMarked, setHelpfulMarked] = useState<string[]>([]);

  const handleReviewSubmit = (review: Review) => {
    setReviews([...reviews, review]);
  };

  const markHelpful = (reviewId: string) => {
    if (helpfulMarked.includes(reviewId)) {
      return;
    }
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, helpful: review.helpful + 1 };
      }
      return review;
    }));
    
    setHelpfulMarked([...helpfulMarked, reviewId]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <RatingSummary 
          reviews={reviews} 
          onWriteReview={() => setShowAddReview(true)} 
        />

        <div className="md:w-2/3">
          <ReviewsList 
            reviews={reviews}
            helpfulMarked={helpfulMarked}
            onMarkHelpful={markHelpful}
          />
        </div>
      </div>

      <ReviewForm
        open={showAddReview}
        onOpenChange={setShowAddReview}
        productId={productId}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
}

export default RatingsAndReviews;
