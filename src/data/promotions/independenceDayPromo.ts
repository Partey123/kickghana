
import { Promotion } from "@/types/promotion.types";

export const independenceDayPromo: Promotion = {
  id: 4,
  title: "Independence Day Promo: Ghana Pride Bundle",
  event: "Independence Day",
  date: "March 6, 2025",
  description: "Celebrate Ghana's 68th Independence Day with pride! Rock the official Ghana jersey, strut in Ghana-made slippers, and wave a Ghana flag scarf. Show your love for the Black Star nation in style!",
  products: [
    {
      name: "Official Ghana Black Stars Jersey",
      price: "GHS 350",
      description: "Polyester fabric, breathable mesh, Black Star logo, authentic design.",
      features: "Polyester fabric, breathable mesh, Black Star logo, authentic design.",
      colors: ["White/Black/Red/Yellow"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Horseman Ghana-Made Slippers",
      price: "GHS 100",
      description: "Rubber sole, Ghana flag print, durable design, made in Kumasi.",
      features: "Rubber sole, Ghana flag print, durable design, made in Kumasi.",
      colors: ["Black/Ghana Flag"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Ghana Flag Scarf (Local Artisan)",
      price: "GHS 80",
      description: "Cotton fabric, vibrant flag colors, lightweight for parades.",
      features: "Cotton fabric, vibrant flag colors, lightweight for parades.",
      colors: ["Red/Yellow/Green/Black"],
      sizes: [],
      image: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ],
  bundlePrice: "GHS 500",
  savings: "GHS 30",
  significance: "Aligns with Ghana Month and Independence Day celebrations, boosting patriotism. High demand for flag-themed items during parades and events.",
  image: "https://images.unsplash.com/photo-1578927752541-5f3e914730e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};
