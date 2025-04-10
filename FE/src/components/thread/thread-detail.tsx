"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Clock,
  Share2,
  Flag,
  MoreVertical,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data for a single thread
const mockThread = {
  id: 1,
  title: "Best headphones under $100?",
  content: "Looking for recommendations for good quality headphones under $100. Any suggestions? I'm mainly using them for music and occasional gaming. I prefer over-ear headphones for better sound isolation. Thanks in advance!",
  author: "John Doe",
  authorAvatar: "https://i.pravatar.cc/150?img=1",
  category: "Electronics",
  tags: ["Headphones", "Audio", "Budget"],
  replies: 24,
  views: 156,
  likes: 18,
  createdAt: "2023-06-15T10:30:00Z",
  lastActivity: "2023-06-16T14:45:00Z",
  isHot: true,
  isPinned: false,
};

// Mock data for replies
const mockReplies = [
  {
    id: 1,
    content: "I've been using the Sony WH-CH510 for about 6 months now and they're great for the price. Good sound quality, comfortable for long sessions, and the battery life is impressive. You can usually find them for around $60-70.",
    author: "Jane Smith",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    likes: 12,
    createdAt: "2023-06-15T11:45:00Z",
    isBestAnswer: true,
  },
  {
    id: 2,
    content: "The JBL Tune 500BT is another good option. They're lightweight, have decent sound quality, and the battery lasts forever. I got mine for $50 on sale.",
    author: "Robert Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    likes: 8,
    createdAt: "2023-06-15T13:20:00Z",
    isBestAnswer: false,
  },
  {
    id: 3,
    content: "If you're willing to stretch your budget a bit, the Audio-Technica ATH-M20x are excellent. They're around $120 but the sound quality is significantly better than most headphones in the $100 range.",
    author: "Emily Davis",
    authorAvatar: "https://i.pravatar.cc/150?img=4",
    likes: 6,
    createdAt: "2023-06-15T15:10:00Z",
    isBestAnswer: false,
  },
  {
    id: 4,
    content: "I second the Sony WH-CH510 recommendation. I've tried several budget headphones and these are the best value for money I've found.",
    author: "Michael Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    likes: 4,
    createdAt: "2023-06-16T09:30:00Z",
    isBestAnswer: false,
  },
  {
    id: 5,
    content: "For gaming, you might want to consider the HyperX Cloud Stinger. They're designed specifically for gaming with good positional audio and a decent microphone. They're usually around $50-60.",
    author: "Sarah Thompson",
    authorAvatar: "https://i.pravatar.cc/150?img=6",
    likes: 3,
    createdAt: "2023-06-16T11:15:00Z",
    isBestAnswer: false,
  },
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

export default function ThreadDetailContent() {
  const params = useParams();
  const threadId = params.id;

  const [replyText, setReplyText] = useState("");
  const [sortBy, setSortBy] = useState("best");
  const [activeTab, setActiveTab] = useState("all");

  // Filter replies based on active tab
  const filteredReplies = mockReplies.filter((reply) => {
    if (activeTab === "all") return true;
    if (activeTab === "best") return reply.isBestAnswer;
    return true;
  });

  // Sort replies based on selected sort option
  const sortedReplies = [...filteredReplies].sort((a, b) => {
    if (sortBy === "best") {
      return a.isBestAnswer ? -1 : b.isBestAnswer ? 1 : 0;
    } else if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return 0;
    }
  });

  const handleSubmitReply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (replyText.trim() === "") return;

    // In a real app, you would send this to your backend
    console.log("Submitting reply:", replyText);

    // Clear the form
    setReplyText("");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/threads" className="flex items-center text-primary hover:text-primary/90">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Threads
        </Link>
      </div>

      {/* Thread Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src={mockThread.authorAvatar}
                alt={mockThread.author}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h1 className="text-2xl font-bold">{mockThread.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>{mockThread.author}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(mockThread.createdAt)}</span>
                    {mockThread.isPinned && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">Pinned</Badge>
                      </>
                    )}
                    {mockThread.isHot && (
                      <>
                        <span>•</span>
                        <Badge variant="destructive" className="text-xs">Hot</Badge>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant="outline">{mockThread.category}</Badge>
              </div>
              <p className="text-gray-700 mb-4">{mockThread.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockThread.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{mockThread.replies} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{mockThread.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{mockThread.likes} likes</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Clock className="h-4 w-4" />
                  <span>Last activity {formatRelativeTime(mockThread.lastActivity)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-bold mb-2 md:mb-0">Replies</h2>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="best">Best First</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">All Replies</TabsTrigger>
            <TabsTrigger value="best" className="flex-1">Best Answer</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {sortedReplies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </TabsContent>
          <TabsContent value="best" className="space-y-4">
            {sortedReplies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Reply Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add a Reply</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReply}>
            <Textarea
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="mb-4 min-h-[150px]"
            />
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Post Reply
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Reply Card Component
function ReplyCard({ reply }: { reply: typeof mockReplies[0] }) {
  return (
    <Card className={`${reply.isBestAnswer ? 'border-primary border-2' : ''} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={reply.authorAvatar}
              alt={reply.author}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{reply.author}</span>
                  {reply.isBestAnswer && (
                    <Badge variant="default" className="bg-primary text-white text-xs">
                      Best Answer
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {formatRelativeTime(reply.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Flag className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-gray-700">{reply.content}</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{reply.likes} likes</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}