"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUp, ChevronDown } from "lucide-react";

interface ModelData {
  id: number;
  name: string;
  description?: string;
  source: string;
  link: string;
  totalRuns: string;
  growth: string;
  growthRate: string;
  updatedTime: string;
  image: string;
}

export function ModelList() {
  const models: ModelData[] = [
    {
      id: 1,
      name: "amazon/chronos-t5-small",
      source: "huggingface.co",
      link: "https://huggingface.co/amazon/chronos-t5-small",
      totalRuns: "43.9M",
      growth: "3.0M",
      growthRate: "7.22%",
      updatedTime: "February 17 2025",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUWK2iXCmGiQtJZQyWK9A6_qCpkqmfGN3tG8AJYnByNfhlbcy"
    },
    {
      id: 2,
      name: "bytedance/sdxl-lightning-4step",
      description: "SDXL-Lightning by ByteDance: a fast text-to-image model that makes high-quality images in 4 steps",
      source: "replicate.com",
      link: "https://replicate.com/bytedance/sdxl-lightning-4step",
      totalRuns: "841.6M",
      growth: "1.9M",
      growthRate: "0.23%",
      updatedTime: "March 17 2025",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGtCRUIUJMoELyjZuFdixsIjuDLyRZiTJ7j1nT0nrTwF-JSWOE"
    },
    {
      id: 3,
      name: "black-forest-labs/flux-schnell",
      description: "The fastest image generation model tailored for local development and personal use",
      source: "replicate.com",
      link: "https://replicate.com/black-forest-labs/flux-schnell",
      totalRuns: "259.1M",
      growth: "1.2M",
      growthRate: "0.47%",
      updatedTime: "March 17 2025",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTALcUbzTfuXUyKtlzhy_-TjCJQnrGN1rFRZ40VYDSglrEjlWYj"
    },
    {
      id: 4,
      name: "jonatasgrosman/wav2vec2-large-xlsr-53-arabic",
      source: "huggingface.co",
      link: "https://huggingface.co/jonatasgrosman/wav2vec2-large-xlsr-53-arabic",
      totalRuns: "4.0M",
      growth: "517.5K",
      growthRate: "12.86%",
      updatedTime: "December 14 2022",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCjw3-YlF8XrGiOvVCZTXbvxR3IvTgL5aSm_iQBzI7KVgj15Tl"
    },
    {
      id: 5,
      name: "dima806/fairface_age_image_detection",
      source: "huggingface.co",
      link: "https://huggingface.co/dima806/fairface_age_image_detection",
      totalRuns: "83.8M",
      growth: "514.0K",
      growthRate: "0.61%",
      updatedTime: "December 15 2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKNJvN8AxLTsIirVxJLFAEXiuRiX9nwXuv5wLhAKGSY6YTfjr"
    },
    {
      id: 6,
      name: "google/electra-base-discriminator",
      source: "huggingface.co",
      link: "https://huggingface.co/google/electra-base-discriminator",
      totalRuns: "29.7M",
      growth: "355.6K",
      growthRate: "1.19%",
      updatedTime: "February 29 2024",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRQGJYv9QdijIQrwZFCvNGFGkSSUIZ7VB54r9IjMnluiN68kqSr"
    },
    {
      id: 7,
      name: "jaaari/kokoro-82m",
      description: "Kokoro v1.0 - text-to-speech (82M params, based on StyleTTS2)",
      source: "replicate.com",
      link: "https://replicate.com/jaaari/kokoro-82m",
      totalRuns: "1.3M",
      growth: "311.0K",
      growthRate: "31.90%",
      updatedTime: "January 29 2025",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BbUMNJy8p0N4jRf9kQpZIo3Dz-8dACWEQWadIXoB9z3fppGS"
    },
    {
      id: 8,
      name: "microsoft/wavlm-base-plus",
      source: "huggingface.co",
      link: "https://huggingface.co/microsoft/wavlm-base-plus",
      totalRuns: "2.8M",
      growth: "267.7K",
      growthRate: "10.65%",
      updatedTime: "December 22 2021",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGwbA3W3bz3uzLglHHEYOmAjr9jYV3mZrUJrC3rfnGZ9SQe8vL"
    },
    {
      id: 9,
      name: "google-bert/bert-base-uncased",
      source: "huggingface.co",
      link: "https://huggingface.co/google-bert/bert-base-uncased",
      totalRuns: "92.9M",
      growth: "261.5K",
      growthRate: "0.28%",
      updatedTime: "February 19 2024",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRQGJYv9QdijIQrwZFCvNGFGkSSUIZ7VB54r9IjMnluiN68kqSr"
    },
    {
      id: 10,
      name: "openai/whisper",
      description: "Convert speech in audio to text",
      source: "replicate.com",
      link: "https://replicate.com/openai/whisper",
      totalRuns: "73.7M",
      growth: "200.0K",
      growthRate: "0.27%",
      updatedTime: "November 26 2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZ-ESfkPMDgfk2NqwLjZgK5GIJgH7YkBEKIlvbpxIDyBhGQIi"
    },
    {
      id: 11,
      name: "black-forest-labs/flux-1.1-pro",
      description: "Faster, better FLUX Pro. Text-to-image model with excellent image quality, prompt adherence, and output diversity.",
      source: "replicate.com",
      link: "https://replicate.com/black-forest-labs/flux-1.1-pro",
      totalRuns: "21.6M",
      growth: "200.0K",
      growthRate: "0.94%",
      updatedTime: "February 04 2025",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTALcUbzTfuXUyKtlzhy_-TjCJQnrGN1rFRZ40VYDSglrEjlWYj"
    },
    {
      id: 12,
      name: "distilbert/distilbert-base-multilingual-cased",
      source: "huggingface.co",
      link: "https://huggingface.co/distilbert/distilbert-base-multilingual-cased",
      totalRuns: "2.5M",
      growth: "191.6K",
      growthRate: "7.76%",
      updatedTime: "May 06 2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHE8J11NrhuBEw8-l0RDiodvA-o8Lnl_TPwGsrOl0b88TcsG1V"
    }
  ];

  return (
    <div className="py-4 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-toolify-border">
              <tr>
                <th className="text-left py-2 px-4 font-medium text-sm">Model</th>
                <th className="text-left py-2 px-4 font-medium text-sm">Source</th>
                <th className="text-left py-2 px-4 font-medium text-sm">Link</th>
                <th className="text-left py-2 px-4 font-medium text-sm cursor-pointer">
                  <div className="flex items-center">
                    Total Runs
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium text-sm cursor-pointer">
                  <div className="flex items-center">
                    Growth
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium text-sm cursor-pointer">
                  <div className="flex items-center">
                    Growth Rate
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium text-sm">Updated Time</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className="hover:bg-toolify-bg transition-colors border-b border-toolify-border"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/ai-model/${model.name.replace(/\//g, '-')}`}
                          className="font-medium text-sm hover:text-toolify-purple"
                        >
                          {model.name}
                        </Link>
                        {model.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                            {model.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{model.source}</td>
                  <td className="py-3 px-4">
                    <a
                      href={model.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-toolify-purple hover:underline flex items-center text-sm"
                    >
                      <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {model.link.replace(/^https?:\/\//, '')}
                      </span>
                      <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-sm">{model.totalRuns}</td>
                  <td className="py-3 px-4 text-sm">{model.growth}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-emerald-600 text-sm">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {model.growthRate}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{model.updatedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border bg-toolify-purple text-white">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border">
              3
            </button>
            <span className="px-2">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border">
              50
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-toolify-border">
              &gt;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
