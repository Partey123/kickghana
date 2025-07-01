
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { StarRating } from "./StarRating";
import { Review } from "./RatingsAndReviews";

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string | number;
  onReviewSubmit: (review: Review) => void;
}

export const ReviewForm = ({ open, onOpenChange, productId, onReviewSubmit }: ReviewFormProps) => {
  const { user } = useAuth();
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

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

    onReviewSubmit(review);
    setNewReview({ rating: 5, comment: "" });
    onOpenChange(false);
    
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your feedback!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <StarRating
              rating={newReview.rating}
              size={24}
              interactive
              onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
            />
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReview}>Submit Review</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
