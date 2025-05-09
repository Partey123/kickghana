
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, Heart, Search, User, Menu, X } from "lucide-react";

interface NavbarProps {
  cartItemsCount?: number;
}

const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-200 bg-gradient-to-r from-red-900 via-amber-900 to-amber-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-4">
            <div className="relative">
              <h1 className="text-2xl font-black tracking-tighter z-10 relative">
                <span className="text-red-500">Kick</span>
                <span className="text-amber-400">Ghana</span>
              </h1>
              <div className="absolute bottom-0 h-1 w-full bg-green-600 rounded-full"></div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/home">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/collections">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Collections
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/men">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Men
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/women">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Women
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchExpanded ? (
                <div className="flex items-center bg-white/10 rounded-full p-1 pl-3 backdrop-blur-sm">
                  <Input 
                    type="search"
                    placeholder="Search products..."
                    className="border-0 bg-transparent text-white placeholder-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 w-40"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-amber-200 hover:bg-transparent"
                    onClick={() => setSearchExpanded(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-amber-200 hover:bg-transparent"
                  onClick={() => setSearchExpanded(true)}
                >
                  <Search size={20} />
                </Button>
              )}
            </div>
            
            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-amber-200 hover:bg-transparent"
              asChild
            >
              <Link to="/wishlist">
                <Heart size={20} />
              </Link>
            </Button>
            
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-amber-200 hover:bg-transparent relative"
              asChild
            >
              <Link to="/cart">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            
            {/* Profile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-amber-200 hover:bg-transparent"
              asChild
            >
              <Link to="/profile">
                <User size={20} />
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Cart icon for mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-amber-200 hover:bg-transparent relative"
              asChild
            >
              <Link to="/cart">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            
            {/* Mobile menu toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-amber-200 hover:bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-red-900 border-t border-amber-800">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/home" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/men"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/women"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
          
          {/* Mobile search */}
          <div className="px-4 py-3 border-t border-amber-800">
            <div className="flex items-center bg-white/10 rounded-full p-1 pl-3 backdrop-blur-sm">
              <Input 
                type="search"
                placeholder="Search products..."
                className="border-0 bg-transparent text-white placeholder-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-amber-200 hover:bg-transparent"
              >
                <Search size={18} />
              </Button>
            </div>
          </div>
          
          {/* Mobile user links */}
          <div className="px-4 py-3 border-t border-amber-800 flex justify-between">
            <Link 
              to="/wishlist" 
              className="flex items-center text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart size={16} className="mr-1" />
              Wishlist
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={16} className="mr-1" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
