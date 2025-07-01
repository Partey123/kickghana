
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <motion.div 
        className="aspect-square rounded-2xl overflow-hidden bg-gray-50/80"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={images[activeImageIndex]} 
          alt={productName}
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                activeImageIndex === index ? 'border-primary' : 'border-gray-200'
              }`}
            >
              <img 
                src={image} 
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
