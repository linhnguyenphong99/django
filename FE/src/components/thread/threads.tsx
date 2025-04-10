"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MessageSquare, ThumbsUp, Eye, Clock } from "lucide-react";
import Link from "next/link";

// Mock data for threads
const mockThreads = [
  {
    id: 1,
    title: "Best headphones under $100?",
    content: "Looking for recommendations for good quality headphones under $100. Any suggestions?",
    author: "John Doe",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    category: "Electronics",
    tags: ["Headphones", "Audio", "Budget"],
    replies: 24,
    views: 156,
    likes: 18,
    isLiked: false, // Added isLiked
    createdAt: "2023-06-15T10:30:00Z",
    lastActivity: "2023-06-16T14:45:00Z",
    isHot: true,
    isPinned: false,
  },
  {
    id: 2,
    title: "New iPhone 15 Pro Max review",
    content: "Just got my hands on the new iPhone 15 Pro Max. Here's my detailed review after a week of use.",
    author: "Jane Smith",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    category: "Electronics",
    tags: ["iPhone", "Apple", "Smartphone"],
    replies: 42,
    views: 289,
    likes: 35,
    isLiked: false, // Added isLiked
    createdAt: "2023-06-14T08:15:00Z",
    lastActivity: "2023-06-16T09:30:00Z",
    isHot: true,
    isPinned: true,
  },
  {
    id: 3,
    title: "Best budget laptop for students",
    content: "My daughter is starting college and needs a laptop. Looking for recommendations under $600.",
    author: "Robert Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    category: "Electronics",
    tags: ["Laptop", "Budget", "Education"],
    replies: 18,
    views: 124,
    likes: 12,
    isLiked: false, // Added isLiked
    createdAt: "2023-06-13T16:45:00Z",
    lastActivity: "2023-06-15T11:20:00Z",
    isHot: false,
    isPinned: false,
  },
  {
    id: 4,
    title: "Wireless vs Wired gaming mouse",
    content: "Debating between a wireless or wired gaming mouse. What are the pros and cons of each?",
    author: "Emily Davis",
    authorAvatar: "https://i.pravatar.cc/150?img=4",
    category: "Electronics",
    tags: ["Gaming", "Mouse", "Accessories"],
    replies: 31,
    views: 198,
    likes: 22,
    isLiked: false, // Added isLiked
    createdAt: "2023-06-12T11:20:00Z",
    lastActivity: "2023-06-14T16:30:00Z",
    isHot: false,
    isPinned: false,
  },
  {
    id: 5,
    title: "Best smartwatch for fitness tracking",
    content: "Looking for a smartwatch that has good fitness tracking features. Any recommendations?",
    author: "Michael Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    category: "Electronics",
    tags: ["Smartwatch", "Fitness", "Wearables"],
    replies: 27,
    views: 167,
    likes: 19,
    isLiked: false, // Added isLiked
    createdAt: "2023-06-11T09:10:00Z",
    lastActivity: "2023-06-13T14:25:00Z",
    isHot: false,
    isPinned: false,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Health",
  "Automotive",
];

// Format date to relative time
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export default function ThreadsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTab, setActiveTab] = useState("all");

  // Filter threads based on search query and category
  const filteredThreads = mockThreads.filter((thread) => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort threads based on selected sort option
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "popular") {
      return b.replies - a.replies;
    } else if (sortBy === "views") {
      return b.views - a.views;
    } else {
      return 0;
    }
  });

  // Filter threads based on active tab
  const displayedThreads = sortedThreads.filter((thread) => {
    if (activeTab === "all") return true;
    if (activeTab === "hot") return thread.isHot;
    if (activeTab === "pinned") return thread.isPinned;
    return true;
  });

  const [likedThreads, setLikedThreads] = useState<number[]>([]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Discussion Threads</h1>
        <Button className="bg-primary hover:bg-primary/90">
          Create New Thread
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search threads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Replies</option>
                    <option value="views">Most Views</option>
                  </select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">All Threads</TabsTrigger>
              <TabsTrigger value="hot" className="flex-1">Hot</TabsTrigger>
              <TabsTrigger value="pinned" className="flex-1">Pinned</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {displayedThreads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} likedThreads={likedThreads} setLikedThreads={setLikedThreads}/>
              ))}
            </TabsContent>
            <TabsContent value="hot" className="space-y-4">
              {displayedThreads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} likedThreads={likedThreads} setLikedThreads={setLikedThreads}/>
              ))}
            </TabsContent>
            <TabsContent value="pinned" className="space-y-4">
              {displayedThreads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} likedThreads={likedThreads} setLikedThreads={setLikedThreads}/>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Electronics", "Gaming", "Smartphone", "Laptop", "Headphones", "Smartwatch", "Camera", "Tablet"].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Thread Card Component
function ThreadCard({ thread, likedThreads, setLikedThreads }: { thread: typeof mockThreads[0], likedThreads: number[], setLikedThreads: (likedThreads: number[]) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={thread.authorAvatar}
              alt={thread.author}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <Link href={`/threads/${thread.id}`} className="text-lg font-semibold hover:text-primary">
                  {thread.title}
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>{thread.author}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(thread.createdAt)}</span>
                  {thread.isPinned && (
                    <>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">Pinned</Badge>
                    </>
                  )}
                  {thread.isHot && (
                    <>
                      <span>•</span>
                      <Badge variant="destructive" className="text-xs">Hot</Badge>
                    </>
                  )}
                </div>
              </div>
              <Badge variant="outline">{thread.category}</Badge>
            </div>
            <p className="text-gray-600 mb-3 line-clamp-2">{thread.content}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {thread.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{thread.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp
                  className={`h-4 w-4 cursor-pointer ${likedThreads.includes(thread.id) ? 'text-primary' : 'text-gray-500'}`}
                  onClick={() => {
                    if (likedThreads.includes(thread.id)) {
                      setLikedThreads(likedThreads.filter(id => id !== thread.id));
                      thread.likes -= 1;
                    } else {
                      setLikedThreads([...likedThreads, thread.id]);
                      thread.likes += 1;
                    }
                  }}
                />
                <span>{thread.likes}</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Clock className="h-4 w-4" />
                <span>Last activity {formatRelativeTime(thread.lastActivity)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}