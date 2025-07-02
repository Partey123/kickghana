
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import NavbarLogo from '@/components/navbar/NavbarLogo';
import DesktopNavLinks from '@/components/navbar/DesktopNavLinks';
import DesktopActionIcons from '@/components/navbar/DesktopActionIcons';
import MobileMenu from '@/components/navbar/MobileMenu';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/cart');
  };

  const handleSearchSubmit = (query: string) => {
    console.log('Search query:', query);
    toast({
      title: "Search",
      description: `Searching for: ${query}`,
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavbarLogo />
            
            <DesktopNavLinks />
            
            <div className="flex items-center space-x-4">
              <DesktopActionIcons 
                cartItemsCount={totalItems}
                onCartClick={handleCartClick}
                onSearchClick={() => setShowSearch(true)}
              />
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-gray-700 hover:text-amber-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onCartClick={handleCartClick}
        cartItemsCount={totalItems}
        onSearchSubmit={handleSearchSubmit}
      />
    </>
  );
};

export default Navbar;
