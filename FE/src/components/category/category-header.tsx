"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function CategoryHeader() {
  return (
    <div className="bg-toolify-bg py-6 px-4 md:px-6 md:py-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find AI By Categories</h1>
        <p className="text-muted-foreground mb-6">
          Over 233 categories to find AI websites and tools.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="bg-white rounded-lg border border-toolify-border p-4 h-full flex flex-col justify-center">
              <div className="relative mb-0">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10 border-toolify-border rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["Text&Writing", "Image", "Video", "Code&IT", "Voice", "Business", "Marketing", "AI Detector", "Chatbot", "Design&Art", "Life Assistant", "3D", "Education", "Prompt", "Productivity", "Other"].map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`rounded-md text-sm ${
                index === 0
                  ? "bg-toolify-purple hover:bg-toolify-lightPurple"
                  : "border-toolify-border hover:text-toolify-purple hover:border-toolify-purple"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
