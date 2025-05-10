
import { Promotion } from "@/types/promotion.types";

export const eidPromo: Promotion = {
  id: 2,
  title: "Eid Promo: Ramadan Elegance Bundle",
  event: "Eid al-Fitr & Eid al-Adha",
  date: "March 31 & June 7, 2025",
  description: "Celebrate Eid in divine style! This bundle brings you a plush prayer mat, a chic hat, comfy slippers, and a flowing jallabia to honor the season with grace and comfort. Step into spirituality with Ghanaian flair!",
  products: [
    {
      name: "Prayer Mat (Local Artisan)",
      price: "GHS 150",
      description: "Handwoven design, soft padding, portable roll-up style.",
      features: "Handwoven design, soft padding, portable roll-up style.",
      colors: ["Green/White", "Blue/Red"],
      sizes: [],
      image: "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Embroidered Taqiyah Hat (Local Brand)",
      price: "GHS 100",
      description: "Cotton fabric, intricate embroidery, breathable fit.",
      features: "Cotton fabric, intricate embroidery, breathable fit.",
      colors: ["White", "Black", "Green"],
      sizes: [],
      image: "https://images.unsplash.com/photo-1572307796676-9ac13fdd81e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Charlie Wote Rubber Slippers",
      price: "GHS 80",
      description: "Durable rubber, non-slip sole, lightweight design.",
      features: "Durable rubber, non-slip sole, lightweight design.",
      colors: ["Black", "Blue"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Jallabia (Handcrafted in Tamale)",
      price: "GHS 300",
      description: "Flowing cotton robe, traditional embroidery, loose fit.",
      features: "Flowing cotton robe, traditional embroidery, loose fit.",
      colors: ["White", "Cream", "Navy"],
      sizes: ["M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ],
  bundlePrice: "GHS 600",
  savings: "GHS 30",
  significance: "Appeals to Ghana's Muslim community during Eid celebrations, with locally made items supporting artisans in Tamale and Accra. Slippers ensure comfort for mosque visits.",
  image: "https://images.unsplash.com/photo-1526669754135-c1babeb8c542?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};
