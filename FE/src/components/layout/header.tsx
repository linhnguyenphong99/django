"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Globe, ChevronDown, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function Header() {
  const categories = [
    { name: "Electronics", count: 42 },
    { name: "Clothing", count: 38 },
    { name: "Books", count: 25 },
    { name: "Home & Garden", count: 31 },
    { name: "Sports", count: 19 },
    { name: "Toys", count: 15 },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-toolify-border bg-white px-4 md:px-6">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="text-toolify-purple"
            >
              <path
                d="M18 3C9.72 3 3 9.72 3 18C3 26.28 9.72 33 18 33C26.28 33 33 26.28 33 18C33 9.72 26.28 3 18 3ZM18 29.4C11.7 29.4 6.6 24.3 6.6 18C6.6 11.7 11.7 6.6 18 6.6C24.3 6.6 29.4 11.7 29.4 18C29.4 24.3 24.3 29.4 18 29.4Z"
                fill="currentColor"
              />
              <path
                d="M18 9.6C13.36 9.6 9.6 13.36 9.6 18C9.6 22.64 13.36 26.4 18 26.4C22.64 26.4 26.4 22.64 26.4 18C26.4 13.36 22.64 9.6 18 9.6ZM18 22.8C15.34 22.8 13.2 20.66 13.2 18C13.2 15.34 15.34 13.2 18 13.2C20.66 13.2 22.8 15.34 22.8 18C22.8 20.66 20.66 22.8 18 22.8Z"
                fill="currentColor"
              />
              <path
                d="M18 16.2C17 16.2 16.2 17 16.2 18C16.2 19 17 19.8 18 19.8C19 19.8 19.8 19 19.8 18C19.8 17 19 16.2 18 16.2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold">Logo</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/whislist" className="text-sm font-medium transition-colors hover:text-primary">
            Wishlist
          </Link>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link href="/category" className="text-sm font-medium transition-colors hover:text-primary">
                Category
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.count}</span>
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <Link href="/threads" className="text-sm font-medium transition-colors hover:text-primary">
          threads
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search AIs"
            className="pl-8 rounded-full border-toolify-border"
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="rounded-btn border-toolify-border">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link href="/user">
            <Button variant="outline" className="rounded-btn border-toolify-border">
              User
            </Button>
          </Link>
          <Button className="rounded-btn bg-toolify-purple hover:bg-toolify-lightPurple text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Submit & Advertise
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full border-toolify-border">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Chinese (Simplified)</DropdownMenuItem>
            <DropdownMenuItem>Chinese (Traditional)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden rounded-full border-toolify-border"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Toolify.ai</SheetTitle>
              <SheetDescription>
                The largest AI tools directory & GPT Store Apps
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search AIs" className="pl-8 rounded-full" />
              </div>
              <nav className="grid gap-2">
                <Link
                  href="/category"
                  className="flex items-center gap-2 text-sm font-medium hover:text-toolify-purple py-2"
                >
                  Category
                </Link>
                <Link
                  href="/ranking"
                  className="flex items-center gap-2 text-sm font-medium hover:text-toolify-purple py-2"
                >
                  Ranking
                </Link>
                <Link
                  href="/high-revenue-ais"
                  className="flex items-center gap-2 text-sm font-medium hover:text-toolify-purple py-2"
                >
                  High Revenue AIs
                </Link>
                <Link
                  href="/ai-model"
                  className="flex items-center gap-2 text-sm font-medium hover:text-toolify-purple py-2"
                >
                  AI Models
                </Link>
                <Link
                  href="/gpts"
                  className="flex items-center gap-2 text-sm font-medium hover:text-toolify-purple py-2"
                >
                  GPTs
                </Link>
              </nav>
              <div className="flex flex-col gap-2 mt-4">
                <Link href="/login">
                <Button variant="outline" className="w-full justify-start rounded-btn">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                </Link>
                <Button className="w-full justify-start rounded-btn bg-toolify-purple hover:bg-toolify-lightPurple">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  Submit & Advertise
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
