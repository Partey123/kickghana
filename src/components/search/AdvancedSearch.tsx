
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown,
  Check 
} from "lucide-react";
import { featuredSneakers } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'newest' | 'popular';

interface SearchResult {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface AdvancedSearchProps {
  onSelect: (id: number) => void;
  className?: string;
}

export const AdvancedSearch = ({ onSelect, className = "" }: AdvancedSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allCategories = ['Running', 'Basketball', 'Casual', 'Traditional', 'Training'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      let filteredResults = featuredSneakers.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      // Apply category filter if any selected
      if (categories.length > 0) {
        filteredResults = filteredResults.filter(product => 
          categories.includes(product.category)
        );
      }

      // Apply price range filter
      filteredResults = filteredResults.filter(product => {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
        return price >= priceRange[0] && price <= priceRange[1];
      });

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filteredResults.sort((a, b) => 
            parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, "")));
          break;
        case 'price-high':
          filteredResults.sort((a, b) => 
            parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, "")));
          break;
        case 'newest':
          // Assuming newer products have higher IDs
          filteredResults.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          // For demo purposes, using a random popularity factor
          filteredResults.sort(() => Math.random() - 0.5);
          break;
        default:
          // Default is relevance, which is based on how closely the name matches
          filteredResults.sort((a, b) => 
            a.name.toLowerCase().indexOf(query.toLowerCase()) - 
            b.name.toLowerCase().indexOf(query.toLowerCase()));
      }

      setResults(filteredResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, categories, priceRange, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 py-2 w-full"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={handleClearSearch}
            >
              <X size={16} />
            </Button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <Button
                      key={category}
                      variant={categories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range (₵{priceRange[0]} - ₵{priceRange[1]})</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={2000}
                  step={50}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="popular">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCategories([]);
                    setPriceRange([0, 2000]);
                    setSortBy('relevance');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2 border-b bg-muted/30">
              <p className="text-xs text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            <div>
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center p-2 hover:bg-accent/30 cursor-pointer"
                  onClick={() => {
                    onSelect(result.id);
                    setShowResults(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                    <img 
                      src={result.image} 
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{result.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-xs font-medium">{result.price}</span>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {result.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {showResults && query.length > 1 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-50 p-4 text-center"
          >
            <p className="text-muted-foreground">No results found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
