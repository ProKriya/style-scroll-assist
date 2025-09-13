import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const hasDiscount = product.price < product.mrp;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 0,
  }).format(product.price);
  const formattedMrp = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 0,
  }).format(product.mrp);

  const handleCardClick = () => {
    window.open(product.product_url, '_blank', 'noopener,noreferrer');
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(product.product_id);
  };

  return (
    <div 
      className="product-card min-w-[240px] max-w-[280px] group cursor-pointer hover-scale"
      onClick={handleCardClick}
    >
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {hasDiscount && (
            <Badge 
              variant="destructive" 
              className="absolute top-1 left-1 text-xs font-bold animate-bounce-subtle"
            >
              -{discountPercentage}%
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="absolute top-1 right-1 text-xs"
          >
            {product.vendor}
          </Badge>
        </div>

        <CardContent className="p-3 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description_snippet}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">
                  {formattedPrice}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formattedMrp}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-yellow-500">★</span>
                <span className="text-xs text-muted-foreground">
                  {product.rating}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              onClick={handleViewClick}
              className="shrink-0 text-xs px-2 h-7"
            >
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;