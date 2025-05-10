
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Search, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Navbar = ({ cartItemsCount = 0, onCartClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle cart click
  const handleCartClick = (e: React.MouseEvent) => {
    if (onCartClick) {
      e.preventDefault();
      onCartClick();
    }
  };
  
  return (
    <header 
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <h1 className="text-2xl font-bold transition-colors duration-300">
                <span className="font-serif font-black">KICK</span>
                <span className="text-primary">GHANA</span>
              </h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="font-medium transition-colors duration-300 hover:text-primary">Home</Link>
            <Link to="/collections" className="font-medium transition-colors duration-300 hover:text-primary">Collections</Link>
            <Link to="/men" className="font-medium transition-colors duration-300 hover:text-primary">Men</Link>
            <Link to="/women" className="font-medium transition-colors duration-300 hover:text-primary">Women</Link>
            <Link to="/about" className="font-medium transition-colors duration-300 hover:text-primary">About</Link>
          </div>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="transition-colors duration-300 hover:text-primary"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <Link to="/wishlist" className="transition-colors duration-300 hover:text-primary">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            
            <Link 
              to="/cart" 
              onClick={handleCartClick}
              className="transition-colors duration-300 relative hover:text-primary"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <Link to="/profile" className="transition-colors duration-300 hover:text-primary">
              <User size={20} strokeWidth={1.5} />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            
            <Link 
              to="/cart" 
              onClick={handleCartClick}
              className="transition-colors duration-300 relative hover:text-primary"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="transition-colors duration-300 hover:text-primary"
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} /> 
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Bar (Desktop) */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md py-4 px-6 transform origin-top transition-transform duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-primary"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/home"
              className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/men" 
              className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between">
                <Link 
                  to="/wishlist" 
                  className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart size={18} className="mr-2" strokeWidth={1.5} /> Wishlist
                </Link>
                <Link 
                  to="/profile" 
                  className="px-4 py-2 hover:text-primary hover:bg-background/10 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} className="mr-2" strokeWidth={1.5} /> Profile
                </Link>
              </div>
              
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="search" 
                    placeholder="Search for products..." 
                    className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
