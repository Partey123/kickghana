
import { Promotion } from "@/types/promotion.types";

export const christmasPromo: Promotion = {
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
};
