
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Navbar = ({ cartItemsCount = 0, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out of your account.',
      });
      navigate('/home');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAuthAction = () => {
    if (user) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/home" className="text-2xl font-bold bg-gradient-to-r from-red-700 to-amber-500 bg-clip-text text-transparent">
              KickGhana
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/home" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="/collections" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Collections
              </a>
              <a href="/promotions" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Promotions
              </a>
              <a href="/accessories" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Accessories
              </a>
            </div>
          </div>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-amber-600">
              <Search size={20} />
            </Button>
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hover:text-amber-600"
                onClick={() => navigate('/wishlist')}
              >
                <Heart size={20} />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-700 hover:text-amber-600 relative"
              onClick={onCartClick}
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hover:text-amber-600"
                onClick={handleAuthAction}
              >
                <User size={20} />
              </Button>
              
              {user && isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    {user.email}
                  </div>
                  <button 
                    onClick={() => { navigate('/profile'); setIsUserMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => { navigate('/order-tracking'); setIsUserMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="/home" className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="/collections" className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium">
                Collections
              </a>
              <a href="/promotions" className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium">
                Promotions
              </a>
              <a href="/accessories" className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium">
                Accessories
              </a>
              
              <div className="flex items-center space-x-4 px-3 py-2">
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Search size={20} />
                </Button>
                
                {user && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-700"
                    onClick={() => navigate('/wishlist')}
                  >
                    <Heart size={20} />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 relative"
                  onClick={onCartClick}
                >
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
                
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/profile')}
                      className="text-gray-700"
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSignOut}
                      className="text-gray-700"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-700"
                    onClick={() => navigate('/login')}
                  >
                    <User size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
