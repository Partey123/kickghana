
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductDetailHeaderProps {
  productName: string;
  category: string;
}

export const ProductDetailHeader = ({ productName, category }: ProductDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      <span className="text-muted-foreground">/</span>
      <span className="text-sm text-muted-foreground">{category}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-sm font-medium">{productName}</span>
    </div>
  );
};
