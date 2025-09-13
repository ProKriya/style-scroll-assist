import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { loadProducts, searchSuggestions, categories } from '@/data/products';
import type { Product } from '@/data/products';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onProductSelect: (productId: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, onProductSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts = await loadProducts();
      setProducts(loadedProducts);
      setFilteredProducts(loadedProducts.slice(0, 5));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const suggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(suggestions.slice(0, 5));

      const productResults = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description_snippet.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(productResults.slice(0, 5));
    } else {
      setFilteredSuggestions([]);
      setFilteredProducts(products.slice(0, 5));
    }
  }, [query, products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    onSearch(suggestion);
  };

  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    onProductSelect(productId);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="search-container">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for fashion, electronics, gadgets..."
          className="pl-10 pr-10 py-3 text-base border-2 border-border focus:border-primary transition-all duration-200 rounded-xl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto animate-scale-in">
          {/* Categories */}
          <div className="border-b border-border p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Categories</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleSuggestionClick(category.name.toLowerCase())}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 text-sm transition-colors"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="border-b border-border">
              <h3 className="text-sm font-semibold text-muted-foreground p-4 pb-2">Suggestions</h3>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="autocomplete-item"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          {/* Product Results */}
          {filteredProducts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground p-4 pb-2">Products</h3>
              {filteredProducts.map((product) => (
                <div
                  key={product.product_id}
                  onClick={() => handleProductClick(product.product_id)}
                  className="autocomplete-item"
                >
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-muted"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{product.price.toLocaleString()} 
                      {product.price < product.mrp && (
                        <span className="ml-2 price-original">₹{product.mrp.toLocaleString()}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-yellow-400">
                      <span className="text-xs">★ {product.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.rating_count}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query && filteredSuggestions.length === 0 && filteredProducts.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;