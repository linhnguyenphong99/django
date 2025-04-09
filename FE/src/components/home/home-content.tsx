"use client";

import { useState, useEffect } from "react";
import useProduct from "@/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Pagination } from "@/components/ui/pagination";

interface Filters {
  categories: string[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
  page: number;
}

export function HomeContent() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    tags: [],
    minPrice: 0,
    maxPrice: 1000,
    page: 1
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const { product, loading } = useProduct(filters);

  // Update total pages when product data changes
  useEffect(() => {
    // Assuming the API returns pagination info in the response
    // This is a placeholder - adjust based on your actual API response
    if (product && product.length > 0) {
      // For now, we'll set a fixed number of pages
      // In a real implementation, this would come from the API
      setTotalPages(10);
    }
  }, [product]);

  const categories = [
    "Text & Writing",
    "Image",
    "Video",
    "Code & IT",
    "Voice",
    "Business",
    "Marketing",
    "AI Detector",
    "Chatbot",
    "Design & Art",
    "Life Assistant",
    "3D",
    "Education",
    "Prompt",
    "Productivity",
    "Other"
  ];

  const tags = [
    "Popular",
    "New",
    "Featured",
    "Best Seller",
    "Limited Time",
    "Sale",
    "Premium",
    "Free"
  ];

  const handleCategoryChange = (category: string) => {
    if (loading) return;
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    setFilters({
      categories: newCategories,
      tags: selectedTags,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page: 1 // Reset to first page when filters change
    });
    setCurrentPage(1); // Reset current page
  };

  const handleTagChange = (tag: string) => {
    if (loading) return;
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    setFilters({
      categories: selectedCategories,
      tags: newTags,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page: 1 // Reset to first page when filters change
    });
    setCurrentPage(1); // Reset current page
  };

  const handlePriceChange = (newRange: number[]) => {
    if (loading) return;
    setPriceRange(newRange);
    setFilters({
      categories: selectedCategories,
      tags: selectedTags,
      minPrice: newRange[0],
      maxPrice: newRange[1],
      page: 1 // Reset to first page when filters change
    });
    setCurrentPage(1); // Reset current page
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || loading) return;

    setCurrentPage(page);
    setFilters({
      ...filters,
      page
    });

    // Scroll to top of products section
    window.scrollTo({
      top: document.querySelector('section')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Products Grid */}
      <div className="flex-1">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Products</h2>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>

                <Tabs defaultValue="categories" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
                    <TabsTrigger value="tags" className="flex-1">Tags</TabsTrigger>
                    <TabsTrigger value="price" className="flex-1">Price Range</TabsTrigger>
                  </TabsList>

                  <TabsContent value="categories">
                    <div className="grid grid-cols-1 gap-4">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                            disabled={loading}
                          />
                          <label
                            htmlFor={category}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                              loading ? 'opacity-50' : ''
                            }`}
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tags">
                    <div className="grid grid-cols-1 gap-4">
                      {tags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => handleTagChange(tag)}
                            disabled={loading}
                          />
                          <label
                            htmlFor={tag}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                              loading ? 'opacity-50' : ''
                            }`}
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="price">
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        max={1000}
                        step={10}
                        className="w-full"
                        disabled={loading}
                      />
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                            className="w-full"
                            disabled={loading}
                          />
                        </div>
                        <span>to</span>
                        <div className="flex-1">
                          <Input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                            className="w-full"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleApplyFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                  <div className="h-64 sm:h-72 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                    <div className="flex gap-2 mb-3">
                      <div className="h-6 bg-gray-200 rounded w-16" />
                      <div className="h-6 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {product.map(product => (
                  <a key={product.id} href={product.get_absolute_url} className="block">
                    <div className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow h-full">
                      <img
                        src={product.get_image}
                        alt={product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = './image/not-found.jpg'
                        }}
                        className="w-full h-64 sm:h-72 object-cover"
                      />

                      <div className="p-6">
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <p className="text-lg text-gray-700 mb-3">{product.price}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 text-sm border border-gray-300 rounded-full">New</span>
                          <span className="px-3 py-1 text-sm border border-gray-300 rounded-full">Popular</span>
                          <span className="px-3 py-1 text-sm border border-gray-300 rounded-full">Best Seller</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Limited-time offer on our best-selling item.
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > -1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-12 mb-8"
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
