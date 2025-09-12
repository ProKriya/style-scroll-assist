import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBox from './SearchBox';
import ProductCard from './ProductCard';
import { products, categories } from '@/data/products';
import type { Product } from '@/data/products';

const ShoppingAssistant: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products.slice(0, 6));
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(products.slice(6, 10));
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, selectedCategory]);

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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-primary">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Shopping Assistant
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products with intelligent search and personalized recommendations
          </p>
        </div>

        {/* Chatbot Container */}
        <div className="chatbot-container max-w-4xl mx-auto animate-scale-in">
          {/* Chat Header */}
          <div className="gradient-primary p-4 text-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6" />
              <div>
                <h2 className="font-semibold">Shopping Assistant</h2>
                <p className="text-sm text-white/80">Find exactly what you're looking for</p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-6 border-b border-border">
            <SearchBox onSearch={handleSearch} onProductSelect={handleProductSelect} />
            
            {/* Category Filters */}
            <div className="flex items-center gap-2 mt-4 animate-slide-in">
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
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {searchQuery ? `Results for "${searchQuery}"` : 'Featured Products'}
              </h3>
              <Badge variant="secondary" className="text-sm">
                {filteredProducts.length} products
              </Badge>
            </div>

            {/* Horizontal Scrollable Product List */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth custom-scrollbar"
            >
              {displayedProducts.map((product, index) => (
                <div key={product.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} onViewDetails={handleViewDetails} />
                </div>
              ))}
              
              {isLoading && (
                <div className="min-w-[280px] max-w-[320px] product-card animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              )}

              {displayedProducts.length < filteredProducts.length && !isLoading && (
                <div className="min-w-[280px] flex items-center justify-center">
                  <Button
                    onClick={loadMoreProducts}
                    variant="outline"
                    className="h-full min-h-[200px] border-dashed border-2 hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    Load More Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8 animate-fade-in">
          <h3 className="text-2xl font-semibold mb-6 text-center">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={product.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <ProductCard product={product} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAssistant;