"use client";

import Link from "next/link";

interface CategoryGroup {
  name: string;
  items: {
    name: string;
    count: number;
    url: string;
  }[];
}

export function CategoryGrid() {
  const categoryGroups: CategoryGroup[] = [
    {
      name: "Text&Writing",
      items: [
        { name: "AI Blog Writer", count: 506, url: "#" },
        { name: "Translate", count: 579, url: "#" },
        { name: "Papers", count: 246, url: "#" },
        { name: "Handwriting", count: 55, url: "#" },
        { name: "Copywriting", count: 863, url: "#" },
        { name: "Captions or Subtitle", count: 471, url: "#" },
        { name: "Essay Writer", count: 290, url: "#" },
        { name: "Letter Writer", count: 171, url: "#" },
        { name: "AI Lyrics Generator", count: 102, url: "#" },
        { name: "Report Writing", count: 261, url: "#" },
        { name: "AI Rewriter", count: 662, url: "#" },
        { name: "AI Script Writing", count: 236, url: "#" }
      ]
    },
    {
      name: "Image",
      items: [
        { name: "Text to Image", count: 787, url: "#" },
        { name: "AI Photo & Image Generator", count: 1967, url: "#" },
        { name: "AI Illustration Generator", count: 470, url: "#" },
        { name: "AI Avatar Generator", count: 400, url: "#" },
        { name: "AI Background Generator", count: 342, url: "#" },
        { name: "AI Banner Generator", count: 271, url: "#" },
        { name: "AI Cover Generator", count: 184, url: "#" },
        { name: "AI Emoji Generator", count: 38, url: "#" },
        { name: "AI GIF Generator", count: 25, url: "#" },
        { name: "AI Icon Generator", count: 75, url: "#" }
      ]
    },
    {
      name: "Video",
      items: [
        { name: "AI Anime & Cartoon Generator", count: 142, url: "#" },
        { name: "AI Animated Video", count: 213, url: "#" },
        { name: "Image to Video", count: 121, url: "#" },
        { name: "AI Music Video Generator", count: 22, url: "#" },
        { name: "AI Video Editor", count: 308, url: "#" },
        { name: "AI Video Enhancer", count: 96, url: "#" },
        { name: "Text to Video", count: 347, url: "#" },
        { name: "AI Video Generator", count: 483, url: "#" }
      ]
    },
    {
      name: "Code&IT",
      items: [
        { name: "AI Maps Generator", count: 22, url: "#" },
        { name: "AI DevOps Assistant", count: 27, url: "#" },
        { name: "AI Landing Page Builder", count: 241, url: "#" },
        { name: "AI Website Builder", count: 515, url: "#" },
        { name: "No-Code&Low-Code", count: 471, url: "#" },
        { name: "AI Code Assistant", count: 560, url: "#" },
        { name: "Code Explanation", count: 235, url: "#" },
        { name: "AI Code Generator", count: 375, url: "#" }
      ]
    },
    {
      name: "Voice",
      items: [
        { name: "AI Audio Enhancer", count: 115, url: "#" },
        { name: "AI Music Generator", count: 268, url: "#" },
        { name: "Text-to-Speech", count: 392, url: "#" },
        { name: "Speech-to-Text", count: 491, url: "#" },
        { name: "Voice & Audio Editing", count: 52, url: "#" },
        { name: "AI Voice Changer", count: 44, url: "#" },
        { name: "AI Voice Cloning", count: 143, url: "#" }
      ]
    },
    {
      name: "Business",
      items: [
        { name: "AI Accounting Assistant", count: 99, url: "#" },
        { name: "Research Tool", count: 403, url: "#" },
        { name: "AI Business Ideas Generator", count: 125, url: "#" },
        { name: "AI Consulting Assistant", count: 108, url: "#" },
        { name: "AI Trading Bot Assistant", count: 153, url: "#" },
        { name: "Tax Assistant", count: 34, url: "#" }
      ]
    },
    {
      name: "Marketing",
      items: [
        { name: "AI Advertising Assistant", count: 2347, url: "#" },
        { name: "AI Instagram Assistant", count: 385, url: "#" },
        { name: "AI Twitter Assistant", count: 355, url: "#" },
        { name: "AI YouTube Assistant", count: 565, url: "#" },
        { name: "AI Facebook Assistant", count: 261, url: "#" },
        { name: "AI Tiktok Assistant", count: 262, url: "#" }
      ]
    },
    {
      name: "AI Detector",
      items: [
        { name: "AI Detector", count: 336, url: "#" },
        { name: "AI Checker Essay", count: 169, url: "#" },
        { name: "AI Plagiarism Checker", count: 159, url: "#" },
        { name: "AI Grammar Checker", count: 328, url: "#" },
        { name: "AI Content Detector", count: 294, url: "#" }
      ]
    },
    {
      name: "Chatbot",
      items: [
        { name: "AI Chatbot", count: 3292, url: "#" },
        { name: "AI Girlfriend", count: 177, url: "#" },
        { name: "AI God", count: 7, url: "#" },
        { name: "AI Joke", count: 22, url: "#" },
        { name: "AI Character", count: 451, url: "#" }
      ]
    },
    {
      name: "Design&Art",
      items: [
        { name: "AI Art Generator", count: 1365, url: "#" },
        { name: "AI Colorize", count: 86, url: "#" },
        { name: "AI Design Generator", count: 739, url: "#" },
        { name: "AI Graphic Design", count: 620, url: "#" },
        { name: "AI Interior & Room Design", count: 223, url: "#" }
      ]
    },
    {
      name: "Life Assistant",
      items: [
        { name: "AI Cooking Assistant", count: 126, url: "#" },
        { name: "AI Dating Assistant", count: 157, url: "#" },
        { name: "AI Pet Planner", count: 207, url: "#" },
        { name: "AI Nutrition", count: 89, url: "#" },
        { name: "AI Healthcare", count: 245, url: "#" }
      ]
    },
    {
      name: "3D",
      items: [
        { name: "3D Generator", count: 111, url: "#" },
        { name: "Text to 3D", count: 87, url: "#" },
        { name: "Image to 3D Model", count: 76, url: "#" }
      ]
    }
  ];

  return (
    <div className="py-8 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {categoryGroups.map((group, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">{group.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
              {group.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.url}
                  className="flex justify-between py-2 hover:text-toolify-purple"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-10 mb-4">
          <Link
            href="#"
            className="text-toolify-purple font-medium hover:underline"
          >
            More recommended
          </Link>
        </div>
      </div>
    </div>
  );
}
