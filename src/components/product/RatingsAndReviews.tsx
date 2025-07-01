
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, User, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

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
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [helpfulMarked, setHelpfulMarked] = useState<string[]>([]);

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

  const handleAddReview = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review.",
        variant: "destructive",
      });
      return;
    }

    if (newReview.comment.length < 10) {
      toast({
        title: "Review too short",
        description: "Please provide at least 10 characters in your review.",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: `review-${Date.now()}`,
      productId,
      userId: user.id,
      userName: user.user_metadata?.full_name || user.email?.split('@')[0] || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
      verified: true,
    };

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: "" });
    setShowAddReview(false);
    
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your feedback!",
    });
    
    // In a real app, this would be saved to a database
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Rating summary */}
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
            onClick={() => setShowAddReview(true)} 
            className="mt-6 w-full"
          >
            Write a Review
          </Button>
        </div>

        {/* Reviews list */}
        <div className="md:w-2/3">
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
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
                      onClick={() => markHelpful(review.id)}
                      disabled={helpfulMarked.includes(review.id)}
                    >
                      <ThumbsUp size={14} />
                      {helpfulMarked.includes(review.id) ? "Helpful" : "Mark as helpful"}
                      {review.helpful > 0 && <span>({review.helpful})</span>}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with this product
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="rating" className="block mb-2">
                Rating
              </Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    className="p-1 h-auto"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= newReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="review" className="block mb-2">
                Your Review
              </Label>
              <Textarea
                id="review"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Share your thoughts about this product..."
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddReview(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReview}>Submit Review</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RatingsAndReviews;
