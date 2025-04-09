"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    categories: string[];
    tags: string[];
    minPrice: number;
    maxPrice: number;
  }) => void;
  isLoading: boolean;
}

export function FilterSidebar({ onFiltersChange, isLoading }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    if (isLoading) return;
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFiltersChange({
      categories: newCategories,
      tags: selectedTags,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };

  const handleTagChange = (tag: string) => {
    if (isLoading) return;
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFiltersChange({
      categories: selectedCategories,
      tags: newTags,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };

  const handlePriceChange = (newRange: number[]) => {
    if (isLoading) return;
    setPriceRange(newRange);
    onFiltersChange({
      categories: selectedCategories,
      tags: selectedTags,
      minPrice: newRange[0],
      maxPrice: newRange[1]
    });
  };

  return (
    <div className="w-64 bg-white p-4 rounded-lg border border-gray-200">
      <div className="space-y-6">
        {/* Categories Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  disabled={isLoading}
                />
                <label
                  htmlFor={category}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                    isLoading ? 'opacity-50' : ''
                  }`}
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="space-y-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagChange(tag)}
                  disabled={isLoading}
                />
                <label
                  htmlFor={tag}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                    isLoading ? 'opacity-50' : ''
                  }`}
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              step={10}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              <span>to</span>
              <div className="flex-1">
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Apply Filters'}
        </Button>
      </div>
    </div>
  );
}