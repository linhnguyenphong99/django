"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Star } from "lucide-react";

export function FeaturedCategory() {
  const featuredTools = [
    {
      id: 1,
      name: "RivalOut",
      description: "AI-Powered rival company analysis platform",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb4JQBRjvXZFBUUzVE5AXgq1KiO0J9HwKrKlHc2YgYYukvtB8n",
      url: "#",
      categories: ["AI Analytics Assistant", "AI SEO Assistant"],
      sponsored: true
    },
    {
      id: 2,
      name: "DocsLoop",
      description: "AI document management for effortless data processing and collaboration.",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR18f9AEe_mwC4t5aN2yIYK9Zdr_uwDQvzMtspgVZzGNJyHmwhI",
      url: "#",
      categories: ["AI PDF", "AI Productivity Tools", "AI Team Collaboration"],
      sponsored: true
    },
    {
      id: 3,
      name: "DocumentLLM",
      description: "AI tools for document analysis and management",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQcVk2j7XixwX5MKRIa9EeSNFy0nNG-gEBTgb-4ZFvwZtBykCSN",
      url: "#",
      categories: ["AI Documents Assistant", "AI Document Extraction", "AI PDF"],
      sponsored: true
    },
    {
      id: 4,
      name: "BrandGhost",
      description: "Automation platform for content creators to manage social media effectively.",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTe3SoyjFW8jtfdXZC5TcLVG9t_QXk5uwJGaNpbGJUfQfpTj6sy",
      url: "#",
      categories: ["AI Social Media Assistant", "AI Instagram Assistant", "AI Twitter Assistant"],
      rating: 5,
      reviews: 2,
      sponsored: true
    }
  ];

  return (
    <div className="py-8 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-xl font-semibold mb-6">Featured*</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link key={tool.id} href="/category/hehe" className="group">
              <Card className="overflow-hidden h-full border-toolify-border hover:shadow-md transition-shadow">
                <div className="relative w-full h-36 bg-gray-100">
                  {tool.image && (
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium group-hover:text-toolify-purple">
                      {tool.name}
                    </h3>
                    {tool.rating && (
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs ml-1">{tool.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {tool.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs rounded-sm border-toolify-border bg-toolify-bg hover:bg-toolify-bg"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  {tool.sponsored && (
                    <div className="absolute top-2 right-2 bg-toolify-purple text-white text-xs px-2 py-0.5 rounded">
                      AD
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
