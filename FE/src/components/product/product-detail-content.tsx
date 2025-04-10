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
const specifications = [
  { id: 1, name: 'Dimensions', value: '10 x 5 x 2 inches' },
  { id: 2, name: 'Weight', value: '1.5 lbs' },
  { id: 3, name: 'Material', value: 'High-quality plastic' },
  { id: 4, name: 'Battery Life', value: 'Up to 10 hours' },
  { id: 5, name: 'Warranty', value: '2 years' },
];

const reviews = [
  {
    id: 1,
    user: 'John Doe',
    rating: 5,
    content: 'Great product! Highly recommend.',
    date: '2023-01-01',
    text: 'I have been using this product for a week now and it has exceeded my expectations.'
  },
  {
    id: 2,
    user: 'Jane Smith',
    rating: 4,
    content: 'Good value for the price.',
    date: '2023-01-02',
    text: 'The product offers good features for the price point. Would buy again.'
  },
  {
    id: 3,
    user: 'Alice Johnson',
    rating: 3,
    content: 'Not what I expected, but still decent.',
    date: '2023-01-03',
    text: 'The product is okay, but it didn’t quite match the description.'
  },
  {
    id: 4,
    user: 'Emily Davis',
    rating: 2,
    content: 'The product did not meet my expectations.',
    date: '2023-01-05',
    text: 'Unfortunately, the product did not work as advertised for me.'
  },
  {
    id: 5,
    user: 'Admin',
    rating: 5,
    content: 'Happy to hear that!',
    date: '2023-01-05',
    text: 'Thank you for your feedback!'
  }
];


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
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const handleReply = (commentId: number) => {
    if (replyText.trim() === '') return;

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: comment.replies.length + 1,
                  user: 'Current User', // Replace with actual user data
                  content: replyText,
                  date: new Date().toISOString().split('T')[0]
                }
              ]
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyText('');
  };
  const [tags, setTags] = useState([
    { id: 1, name: 'New Arrival' },
    { id: 2, name: 'Best Seller' },
    { id: 3, name: 'Limited Edition' },
    { id: 4, name: 'Discount' },
    { id: 5, name: 'Popular' },
    { id: 6, name: 'Trending' },
    { id: 7, name: 'Sale' },
    { id: 8, name: 'New' },
    { id: 9, name: 'Old' },
    { id: 10, name: 'Used' },
    { id: 11, name: 'Refurbished' },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'John Doe',
      content: 'Great product! Highly recommend.',
      date: '2023-01-01',
      text: 'I have been using this product for a week now and it has exceeded my expectations.',
      replies: [
        {
          id: 1,
          user: 'Admin',
          content: 'Thank you for your feedback!',
          date: '2023-01-02'
        }
      ]
    },
    {
      id: 2,
      user: 'Jane Smith',
      content: 'Good value for the price.',
      date: '2023-01-02',
      text: 'The product offers good features for the price point. Would buy again.',
      replies: [
        {
          id: 2,
          user: 'Support',
          content: 'We are glad you liked it!',
          date: '2023-01-03'
        }
      ]
    },
    {
      id: 3,
      user: 'Alice Johnson',
      content: 'Not what I expected, but still decent.',
      date: '2023-01-03',
      text: 'The product is okay, but it didn’t quite match the description.',
      replies: []
    },
    {
      id: 4,
      user: 'Bob Brown',
      content: 'Excellent quality and fast shipping.',
      date: '2023-01-04',
      text: 'I was impressed with the quality and the shipping was faster than expected.',
      replies: [
        {
          id: 3,
          user: 'Admin',
          content: 'Happy to hear that!',
          date: '2023-01-05'
        }
      ]
    },
    {
      id: 5,
      user: 'Emily Davis',
      content: 'The product did not meet my expectations.',
      date: '2023-01-05',
      text: 'Unfortunately, the product did not work as advertised for me.',
      replies: [
        {
          id: 4,
          user: 'Support',
          content: 'We are sorry to hear that. Please contact us for assistance.',
          date: '2023-01-06'
        }
      ]
    }
  ]);

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
                        <span className="text-gray-600 mr-4">Tags</span>
                        <div className="flex flex-wrap gap-2">
                          {tags?.map((tag) => (
                            <Badge key={tag.id} variant="outline" className="whitespace-nowrap">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="specifications" className="p-6">
                    <div className="text-center text-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {specifications.map((specification) => (
                          <div key={specification.id} className="flex justify-between p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <span className="font-semibold text-gray-900">{specification.name}</span>
                            <span className="text-gray-700">{specification.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="p-6">
                    {reviews.length === 0 ? (
                      <div className="text-center text-gray-500">
                        No reviews yet. Be the first to review this product!
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-semibold">{review.user}</span>
                                <p className="text-gray-700 mt-1">{review.content}</p>
                                <span className="text-gray-500 text-sm">{review.date}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-1">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold">{comment.user}</span>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <button className="text-gray-500 hover:text-toolify-purple">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-3a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-toolify-purple">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-toolify-purple">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M15 8a3 3 0 00-3-3H6a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3V8zM5 8a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1V8zm10 0a1 1 0 00-1-1h-1v6h1a1 1 0 001-1V8z" />
                        </svg>
                      </button>
                      <button
                        className="text-toolify-purple text-sm ml-4"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        Reply
                      </button>
                    </div>
                    {comment.replies && (
                      <div className="ml-6 mt-3 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold">{reply.user}</span>
                              <p className="text-gray-700 mt-1">{reply.content}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <button className="text-gray-500 hover:text-toolify-purple">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-3a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                                  </svg>
                                </button>
                                <button className="text-gray-500 hover:text-toolify-purple">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2z" />
                                  </svg>
                                </button>
                                <button className="text-gray-500 hover:text-toolify-purple">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M15 8a3 3 0 00-3-3H6a3 3 0 00-3 3v4a3 3 0 003 3h6a3 3 0 003-3V8zM5 8a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1V8zm10 0a1 1 0 00-1-1h-1v6h1a1 1 0 001-1V8z" />
                                  </svg>
                                </button>
                                <button
                                  className="text-toolify-purple text-sm ml-4"
                                  onClick={() => setReplyingTo(comment.id)}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {replyingTo === comment.id && (
                      <div className="mt-3">
                        <input
                          type="text"
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-toolify-purple"
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          className="mt-2 bg-toolify-purple text-white px-4 py-2 rounded hover:bg-toolify-purple-dark"
                          onClick={() => handleReply(comment.id)}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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