import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBox from './SearchBox';
import ProductCard from './ProductCard';
import { loadProducts, categories } from '@/data/products';
import type { Product } from '@/data/products';

const ShoppingAssistant: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loadedProducts = await loadProducts();
        setProducts(loadedProducts);
        setFilteredProducts(loadedProducts);
        setDisplayedProducts(loadedProducts.slice(0, 6));
        setRelatedProducts(loadedProducts.slice(6, 10));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    
    let filtered = products;

    if (searchQuery) {
      filtered = products.filter(product =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description_snippet?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, 6));
    
    // Update related products based on current selection
    const remaining = filtered.slice(6);
    setRelatedProducts(remaining.length > 0 ? remaining.slice(0, 4) : products.slice(0, 4));
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductSelect = (productId: string) => {
    console.log('Selected product:', productId);
    // In a real app, this would navigate to product details or show in modal
  };

  const handleViewDetails = (productId: string) => {
    console.log('View details for product:', productId);
    // In a real app, this would navigate to product details page
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = filteredProducts.slice(currentLength, currentLength + 4);
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setIsLoading(false);
    }, 800);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100;
    
    if (isNearEnd && !isLoading && displayedProducts.length < filteredProducts.length) {
      loadMoreProducts();
    }
  };

  return (
    <div className="h-full bg-background flex flex-col">
      <div className="flex-1 overflow-hidden">
        {/* Compact Header */}
        <div className="text-center mb-4 animate-fade-in px-4 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 rounded-full gradient-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Shopping Assistant
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Find exactly what you're looking for
          </p>
        </div>

        {/* Chatbot Container */}
        <div className="chatbot-container flex-1 animate-scale-in flex flex-col">
          {/* Compact Chat Header */}
          <div className="gradient-primary p-3 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h2 className="text-sm font-semibold">Shopping Assistant</h2>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-4 border-b border-border">
            <SearchBox onSearch={handleSearch} onProductSelect={handleProductSelect} />
            
            {/* Category Filters */}
            <div className="flex items-center gap-2 mt-3 animate-slide-in">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="p-4 flex-1 overflow-hidden flex flex-col">
            {isInitialLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading products...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Featured'}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {filteredProducts.length}
                  </Badge>
                </div>

                {/* Horizontal Scrollable Product List */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-4 scroll-smooth custom-scrollbar flex-1"
                >
                  {displayedProducts.map((product, index) => (
                    <div key={product.product_id} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ProductCard product={product} onViewDetails={handleViewDetails} />
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="min-w-[240px] max-w-[280px] product-card animate-pulse">
                      <div className="w-full h-32 bg-muted rounded-lg mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-muted rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-2/3"></div>
                      </div>
                    </div>
                  )}

                  {displayedProducts.length < filteredProducts.length && !isLoading && (
                    <div className="min-w-[240px] flex items-center justify-center">
                      <Button
                        onClick={loadMoreProducts}
                        variant="outline"
                        size="sm"
                        className="h-full min-h-[160px] border-dashed border-2 hover:border-primary hover:text-primary transition-all duration-300"
                      >
                        Load More
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShoppingAssistant;