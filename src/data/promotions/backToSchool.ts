
import { Promotion } from "@/types/promotion.types";

export const backToSchoolPromo: Promotion = {
  id: 1,
  title: "Back to School Promo: University Swagger Pack",
  event: "Back-to-School Season",
  date: "September 2025",
  description: "Gear up for uni with the ultimate swagger pack! Rock the campus with bold Nike Dunks, trendy jeans, comfy socks, a sleek watch, and a designer shirt that screams style. Perfect for lectures, parties, and everything in between—slay the semester in style!",
  products: [
    {
      name: "Nike SB Dunk Low (Adinkra)",
      price: "GHS 1,100",
      description: "Adinkra-embroidered sneaker, suede upper, Zoom Air unit, rubber outsole.",
      features: "Adinkra-embroidered sneaker, suede upper, Zoom Air unit, rubber outsole.",
      colors: ["Black/Adinkra", "Green/Adinkra"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Levi's 501 Original Jeans",
      price: "GHS 500",
      description: "Classic straight-fit jeans, 100% cotton, durable denim.",
      features: "Classic straight-fit jeans, 100% cotton, durable denim.",
      colors: ["Blue Wash", "Black"],
      sizes: ["30", "32", "34", "36"],
      image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Nike Everyday Cushion Socks (3-Pack)",
      price: "GHS 150",
      description: "Moisture-wicking fabric, cushioned sole, breathable design.",
      features: "Moisture-wicking fabric, cushioned sole, breathable design.",
      colors: ["White", "Black"],
      sizes: ["M", "L"],
      image: "https://images.unsplash.com/photo-1586350977771-2057de11432c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Casio Vintage Digital Watch",
      price: "GHS 300",
      description: "Stainless steel case, digital display, water-resistant, retro design.",
      features: "Stainless steel case, digital display, water-resistant, retro design.",
      colors: ["Silver", "Black"],
      sizes: [],
      image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Gucci-Inspired Designer Shirt (Local Brand)",
      price: "GHS 250",
      description: "Tailored fit, premium cotton, bold print, made in Kumasi.",
      features: "Tailored fit, premium cotton, bold print, made in Kumasi.",
      colors: ["White/Red", "Black/Gold"],
      sizes: ["S", "M", "L", "XL"],
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ],
  bundlePrice: "GHS 2,200",
  savings: "GHS 100",
  significance: "Targets university students at KNUST, UG, and UCC, aligning with Back-to-School sales in September 2025. The Adinkra Dunk adds cultural flair, perfect for campus events.",
  image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};
