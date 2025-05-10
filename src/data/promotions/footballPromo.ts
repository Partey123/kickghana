
import { Promotion } from "@/types/promotion.types";

export const footballPromo: Promotion = {
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
};
