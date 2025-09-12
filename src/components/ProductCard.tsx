import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const discountPercentage = Math.round(((product.price - product.discountedPrice) / product.price) * 100);

  return (
    <div className="product-card min-w-[280px] max-w-[320px] group">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg bg-muted"
        />
        {discountPercentage > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 left-2 font-bold animate-bounce-subtle"
          >
            -{discountPercentage}%
          </Badge>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="price-discounted">${product.discountedPrice}</span>
          {product.price !== product.discountedPrice && (
            <span className="price-original">${product.price}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <Button
          onClick={() => onViewDetails(product.id)}
          className="w-full mt-4 gradient-primary text-white hover:opacity-90 transition-all duration-300 font-medium"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;