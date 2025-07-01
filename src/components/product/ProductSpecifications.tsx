
import { Card, CardContent } from "@/components/ui/card";
import { UnifiedProduct } from "@/types/product";

interface ProductSpecificationsProps {
  product: UnifiedProduct;
  selectedColor?: string;
  selectedSize?: string;
}

export const ProductSpecifications = ({ 
  product, 
  selectedColor, 
  selectedSize 
}: ProductSpecificationsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Product Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span>{product.category}</span>
          </div>
          {selectedColor && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Color:</span>
              <span>{selectedColor}</span>
            </div>
          )}
          {selectedSize && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span>{selectedSize}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
