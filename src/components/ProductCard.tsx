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
  const discountPercentage = Math.round(((product.price - product.discountedPrice) / product.price) * 100);

  return (
    <div className="product-card min-w-[240px] max-w-[280px] group cursor-pointer hover-scale">
      <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-1 left-1 text-xs font-bold animate-bounce-subtle"
            >
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <CardContent className="p-3 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">
                  ${product.discountedPrice}
                </span>
                {product.discountedPrice < product.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              {product.colors && product.colors.length > 0 && (
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              )}
            </div>

            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product.id);
              }}
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