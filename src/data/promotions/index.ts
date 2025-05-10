
import { Promotion, PromoProduct } from "@/types/promotion.types";
import { backToSchoolPromo } from "./backToSchool";
import { eidPromo } from "./eidPromo";
import { christmasPromo } from "./christmasPromo";
import { independenceDayPromo } from "./independenceDayPromo";
import { footballPromo } from "./footballPromo";

// Export all promotions as an array
export const promotions: Promotion[] = [
  backToSchoolPromo,
  eidPromo,
  christmasPromo,
  independenceDayPromo,
  footballPromo
];

// Export individual promotions
export {
  backToSchoolPromo,
  eidPromo,
  christmasPromo,
  independenceDayPromo,
  footballPromo
};

// Helper function to extract accessories from promotions
export const extractAccessories = (): PromoProduct[] => {
  return promotions.flatMap(promo => 
    promo.products.filter(product => 
      !product.name.toLowerCase().includes("sneaker") && 
      !product.name.toLowerCase().includes("shoe") &&
      !product.name.toLowerCase().includes("nike") &&
      !product.name.toLowerCase().includes("adidas") &&
      !product.name.toLowerCase().includes("puma") &&
      !product.name.toLowerCase().includes("jordan")
    )
  );
};

// Export accessories
export const accessories = extractAccessories();
