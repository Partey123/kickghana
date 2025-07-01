
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  isNew: boolean;
  description?: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max Elite",
    price: "GHS 450",
    image: "/sneaker1.png",
    category: "Running",
    isNew: true,
    description: "Premium running shoes with advanced cushioning technology.",
    features: ["Air cushioning", "Breathable mesh", "Durable outsole"],
    colors: ["Black", "White", "Red"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 2,
    name: "Urban Street",
    price: "GHS 320",
    image: "/sneaker2.png",
    category: "Casual",
    isNew: false,
    description: "Stylish casual sneakers perfect for everyday wear.",
    features: ["Comfortable fit", "Versatile design", "Premium materials"],
    colors: ["Black", "Brown", "Navy"],
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: 3,
    name: "Pro Basketball",
    price: "GHS 550",
    image: "/sneaker3.png",
    category: "Basketball",
    isNew: true,
    description: "High-performance basketball shoes for serious players.",
    features: ["Ankle support", "Grip technology", "Impact absorption"],
    colors: ["Black", "White", "Blue"],
    sizes: ["8", "9", "10", "11", "12", "13"]
  },
  {
    id: 4,
    name: "Classic Retro",
    price: "GHS 280",
    image: "/sneaker4.png",
    category: "Casual",
    isNew: false,
    description: "Timeless design with modern comfort features.",
    features: ["Retro styling", "Comfortable sole", "Durable construction"],
    colors: ["White", "Black", "Gray"],
    sizes: ["6", "7", "8", "9", "10", "11"]
  },
  {
    id: 5,
    name: "Training Pro",
    price: "GHS 380",
    image: "/sneaker1.png",
    category: "Training",
    isNew: false,
    description: "Versatile training shoes for all workout types.",
    features: ["Multi-directional grip", "Stability support", "Lightweight design"],
    colors: ["Black", "Gray", "Blue"],
    sizes: ["7", "8", "9", "10", "11", "12"]
  }
];

// Export alias for backward compatibility
export const featuredSneakers = products;
