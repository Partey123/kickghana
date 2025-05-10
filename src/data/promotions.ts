
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
  },
  {
    id: 3,
    title: "Christmas Promo: Festive Vibes Mega Pack",
    event: "Christmas",
    date: "December 25, 2025",
    description: "Jingle all the way with our festive mega pack! Snag a stylish Puma sneaker, a cozy hoodie, festive socks, and a trendy bucket hat to shine at every Christmas party. Spread joy and slay the holiday season!",
    products: [
      {
        name: "Puma Suede Classic",
        price: "GHS 650",
        description: "Suede upper, EVA foam midsole, rubber outsole, retro style.",
        features: "Suede upper, EVA foam midsole, rubber outsole, retro style.",
        colors: ["Black", "Red"],
        sizes: ["39", "40", "41", "42", "43", "44"],
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Horseman Hoodie (Local Brand)",
        price: "GHS 200",
        description: "Cotton blend, bold print, kangaroo pocket, made in Ghana.",
        features: "Cotton blend, bold print, kangaroo pocket, made in Ghana.",
        colors: ["Red/Green", "Black"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Christmas-Themed Socks (2-Pack)",
        price: "GHS 100",
        description: "Cotton blend, festive Santa and tree designs, cushioned sole.",
        features: "Cotton blend, festive Santa and tree designs, cushioned sole.",
        colors: ["Red/White", "Green/White"],
        sizes: [],
        image: "https://images.unsplash.com/photo-1543585324-23433ec4cae4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Bucket Hat (Local Artisan)",
        price: "GHS 120",
        description: "Reversible design, Kente and plain fabric, adjustable fit.",
        features: "Reversible design, Kente and plain fabric, adjustable fit.",
        colors: ["Kente/Black", "Kente/White"],
        sizes: [],
        image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    bundlePrice: "GHS 1,000",
    savings: "GHS 70",
    significance: "Captures the festive spirit for Christmas gifting, appealing to families and youth in Accra and Kumasi. Kente accents tie into Ghanaian pride.",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
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
  },
  {
    id: 5,
    title: "Football Season Promo: Ultimate Fan Kit",
    event: "Ghana Premier League & AFCON",
    date: "January-February 2025",
    description: "Get match-ready with the ultimate fan kit! Score a full Black Stars jersey, grippy cleats, and a durable football to dominate the pitch or cheer from the stands. Be the heart of Ghana's football fever!",
    products: [
      {
        name: "Full Black Stars Jersey (Home Kit)",
        price: "GHS 400",
        description: "Polyester, moisture-wicking, Black Star emblem, player-fit design.",
        features: "Polyester, moisture-wicking, Black Star emblem, player-fit design.",
        colors: ["White/Black/Red/Yellow"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1518013333832-0223879d8daa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Adidas Predator Freak Cleats",
        price: "GHS 800",
        description: "Demonskin spikes, synthetic upper, ControlFrame outsole, ankle support.",
        features: "Demonskin spikes, synthetic upper, ControlFrame outsole, ankle support.",
        colors: ["Black/Red", "White/Blue"],
        sizes: ["40", "41", "42", "43", "44", "45"],
        image: "https://images.unsplash.com/photo-1543248335-1947d3459d77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Mitre Delta Football",
        price: "GHS 250",
        description: "FIFA-approved, polyurethane cover, textured surface, durable bladder.",
        features: "FIFA-approved, polyurethane cover, textured surface, durable bladder.",
        colors: ["White/Black"],
        sizes: [],
        image: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    bundlePrice: "GHS 1,400",
    savings: "GHS 50",
    significance: "Targets football fans during the Ghana Premier League and AFCON, with high demand in urban centers like Accra and Tamale. Cleats appeal to amateur players.",
    image: "https://images.unsplash.com/photo-1522778034537-20a2486be367?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
