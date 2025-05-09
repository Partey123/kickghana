
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-xl font-bold">
                <span className="font-serif font-black">KICK</span>
                <span className="text-primary">GHANA</span>
              </h2>
            </Link>
            <p className="text-white/70 mb-6">
              Premium footwear with authentic Ghanaian style and quality craftsmanship. 
              We blend traditional artisanship with modern design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                <Youtube size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/men" className="text-white/70 hover:text-primary transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="text-white/70 hover:text-primary transition-colors">Women's Collection</Link></li>
              <li><Link to="/new-arrivals" className="text-white/70 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/sales" className="text-white/70 hover:text-primary transition-colors">Special Offers</Link></li>
              <li><Link to="/collections" className="text-white/70 hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-white/70 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-white/70 hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/care" className="text-white/70 hover:text-primary transition-colors">Shoe Care Guide</Link></li>
              <li><Link to="/size-chart" className="text-white/70 hover:text-primary transition-colors">Size Chart</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="mr-3 mt-1">📍</span>
                <span>Accra Mall, Ghana</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">📱</span>
                <span>+233 20 123 4567</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">✉️</span>
                <span>info@kickghana.com</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">⏰</span>
                <span>Mon-Fri: 9am - 6pm<br />Sat: 10am - 4pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2025 KickGhana. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
