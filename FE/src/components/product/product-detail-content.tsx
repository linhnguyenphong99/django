"use client";

import { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductDetailContentProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    tags: string[];
    get_absolute_url: string;
    get_image: string;
  };
}

// Memoized components
const ProductImage = memo(({ src, alt, mediaList = [] }: { src: string; alt: string; mediaList?: string[] }) => {
  const [currentImage, setCurrentImage] = useState(src);

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-[4/3] max-h-[600px] bg-gray-50 rounded-lg">
        <img
          src={currentImage}
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
      {mediaList.length > 0 && (
        <div className="relative w-full">
          <div className="flex gap-3 overflow-x-auto pb-4 px-1 pt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div
              className={`relative w-[calc(25%-9px)] aspect-square flex-shrink-0 cursor-pointer rounded-lg transition-all duration-200 hover:opacity-90 ${
                currentImage === src
                  ? 'border-2 border-gray-300'
                  : ''
              }`}
              onClick={() => setCurrentImage(src)}
            >
              <img
                src={src}
                alt={`${alt} - Main`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            {mediaList.map((media, index) => (
              <div
                key={index}
                className={`relative w-[calc(25%-9px)] aspect-square flex-shrink-0 cursor-pointer rounded-lg transition-all duration-200 hover:opacity-90 ${
                  currentImage === media
                    ? 'border-2 border-gray-300'
                    : ''
                }`}
                onClick={() => setCurrentImage(media)}
              >
                <img
                  src={media}
                  alt={`${alt} - ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
ProductImage.displayName = 'ProductImage';

const QuantitySelector = memo(({
  quantity,
  onQuantityChange
}: {
  quantity: number;
  onQuantityChange: (value: number) => void;
}) => (
  <div className="flex items-center border rounded-lg">
    <Button
      variant="outline"
      className="px-3 py-1"
      onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
    >
      -
    </Button>
    <Input
      type="number"
      value={quantity}
      onChange={(e) => {
        const value = parseInt(e.target.value);
        if (value > 0) onQuantityChange(value);
      }}
      className="w-16 text-center border-0"
      min="1"
    />
    <Button
      variant="outline"
      className="px-3 py-1"
      onClick={() => onQuantityChange(quantity + 1)}
    >
      +
    </Button>
  </div>
));
QuantitySelector.displayName = 'QuantitySelector';

const TagButton = memo(({
  tag,
  isFirst
}: {
  tag: string;
  isFirst: boolean;
}) => (
  <Button
    variant={isFirst ? "default" : "outline"}
    className={`rounded-md text-sm ${
      isFirst
        ? "bg-toolify-purple hover:bg-toolify-lightPurple"
        : "border-toolify-border hover:text-toolify-purple hover:border-toolify-purple"
    }`}
  >
    {tag}
  </Button>
));
TagButton.displayName = 'TagButton';

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [quantity, setQuantity] = useState(1);
  const [mediaList] = useState([
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
  ]);

  const handleQuantityChange = useCallback((value: number) => {
    setQuantity(value);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Product */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <ProductImage
                src={product.get_image}
                alt={product.name}
                mediaList={mediaList}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Category</Badge>
                </div>
                <div className="prose max-w-none mb-6">
                  {product.description}
                </div>
              </CardContent>
            </Card>

            {/* Product Details Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="flex-1">
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1">
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Tags</span>
                        <div className="flex gap-2">
                          {product.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="specifications" className="p-6">
                    <div className="text-center text-gray-500">
                      Specifications coming soon...
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="p-6">
                    <div className="text-center text-gray-500">
                      No reviews yet. Be the first to review this product!
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Related Products */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={product.get_image}
                          alt="Related product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Related Product {item}</h3>
                        <p className="text-sm text-gray-500 mb-2">Category</p>
                        <div className="text-toolify-purple font-medium">$99.99</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Electronics", "Clothing", "Books", "Home & Garden", "Sports"].map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between py-2 hover:text-toolify-purple cursor-pointer"
                    >
                      <span>{category}</span>
                      <span className="text-sm text-gray-500">(24)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}