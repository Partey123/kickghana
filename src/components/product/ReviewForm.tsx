
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StarRating } from "./StarRating";
import { Review } from "./RatingsAndReviews";

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string | number;
  onReviewSubmit: (review: Review) => void;
}

export const ReviewForm = ({ open, onOpenChange, productId, onReviewSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !userName.trim()) {
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      productId: productId,
      userId: "user-" + Date.now(),
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      verified: Math.random() > 0.5, // Random verification for demo
    };

    onReviewSubmit(newReview);
    
    // Reset form
    setRating(0);
    setComment("");
    setUserName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userName">Your Name</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <Label>Rating</Label>
            <div className="mt-1">
              <StarRating 
                rating={rating} 
                size={24} 
                interactive={true} 
                onRatingChange={setRating} 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="comment">Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={rating === 0 || !userName.trim()}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
