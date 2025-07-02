
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SearchResult {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface FunctionalSearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

// Mock search data - in a real app, this would come from your API
const searchData: SearchResult[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: "GHS 800",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    category: "Running"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: "GHS 750",
    image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    category: "Running"
  },
  {
    id: 3,
    name: "Jordan Air 1 Mid",
    price: "GHS 900",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    category: "Basketball"
  },
  {
    id: 4,
    name: "Puma RS-X",
    price: "GHS 650",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    category: "Lifestyle"
  }
];

const FunctionalSearchModal = ({
  showSearchModal,
  setShowSearchModal,
  searchTerm,
  setSearchTerm,
  handleSearch
}: FunctionalSearchModalProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    performSearch(value);
  };

  const handleResultClick = (productId: number) => {
    setShowSearchModal(false);
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/product/${productId}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].id);
    }
  };

  return (
    <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Search Products</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearchModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for shoes, brands, categories..."
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10 text-lg py-6"
              autoFocus
            />
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {isSearching && (
              <div className="text-center py-8 text-muted-foreground">
                Searching...
              </div>
            )}

            {!isSearching && searchTerm && searchResults.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found for "{searchTerm}"
              </div>
            )}

            {!isSearching && searchResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => handleResultClick(result.id)}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-secondary">{result.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{result.category}</span>
                    <span>•</span>
                    <span className="font-semibold text-primary">{result.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {!searchTerm && (
              <div className="text-center py-8 text-muted-foreground">
                Start typing to search for products...
              </div>
            )}
          </div>

          {searchResults.length > 0 && (
            <Button type="submit" className="w-full">
              View "{searchResults[0].name}"
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FunctionalSearchModal;
