
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

export const promotions: Promotion[] = [
  {
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
  },
  {
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
      }
    ],
    bundlePrice: "GHS 600",
    savings: "GHS 30",
    significance: "Appeals to Ghana's Muslim community during Eid celebrations, with locally made items supporting artisans in Tamale and Accra. Slippers ensure comfort for mosque visits.",
    image: "https://images.unsplash.com/photo-1526669754135-c1babeb8c542?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Christmas Promo: Festive Vibes Mega Pack",
    event: "Christmas",
    date: "December 25, 2025",
    description: "Jingle all the way with our festive mega pack! Snag a stylish Puma sneaker, a cozy hoodie, festive socks, and a trendy bucket hat to shine at every Christmas party. Spread joy and slay the holiday season!",
    products: [],
    bundlePrice: "GHS 1,000",
    savings: "GHS 70",
    significance: "Captures the festive spirit for Christmas gifting, appealing to families and youth in Accra and Kumasi. Kente accents tie into Ghanaian pride.",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Accessories are products that are part of the promotions
export const accessories = promotions.flatMap(promo => 
  promo.products.filter(product => 
    !product.name.toLowerCase().includes("sneaker") && 
    !product.name.toLowerCase().includes("shoe") &&
    !product.name.toLowerCase().includes("nike") &&
    !product.name.toLowerCase().includes("adidas") &&
    !product.name.toLowerCase().includes("puma") &&
    !product.name.toLowerCase().includes("jordan")
  )
);
