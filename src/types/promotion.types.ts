
export interface PromoProduct {
  name: string;
  price: string;
  description: string;
  features: string;
  colors: string[];
  sizes: string[];
  image?: string;
}

export interface Promotion {
  id: number;
  title: string;
  event: string;
  date: string;
  description: string;
  products: PromoProduct[];
  bundlePrice: string;
  savings: string;
  significance: string;
  image?: string;
}
