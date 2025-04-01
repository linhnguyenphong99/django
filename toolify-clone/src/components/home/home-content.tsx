"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowUpRight } from "lucide-react";
import useProduct from "@/hooks/useProduct";

export function HomeContent() {
  const product = useProduct()

  return (
    <section className="px-4 py-16 md:px-6 bg-white">
      <div className="container mx-auto">
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Featured AI Tools</h2>
              <p className="text-muted-foreground mt-1">Discover the most popular AI tools</p>
            </div>
            <TabsList className="rounded-full">
              <TabsTrigger value="featured" className="rounded-full">Featured</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">Just Launched</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="featured" className="animate-fade-in">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.product.map((product) => (
                <Link href={product?.slug} key={product?.id} className="group">
                  <Card className="overflow-hidden border-toolify-border h-full hover:shadow-md transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48 bg-gray-100">
                        {product?.get_image && (
                          <Image
                            src={product?.get_image}
                            alt={product?.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="rounded-full text-xs bg-toolify-bg">
                          {product?.description}
                        </Badge>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="text-xs ml-1">{product?.price}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-toolify-purple">
                        {product?.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {product?.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <Button size="sm" variant="ghost" className="rounded-full hover:bg-toolify-bg hover:text-toolify-purple">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <div className="mt-8 text-center">
            <Button variant="outline" className="rounded-btn border-toolify-border">
              View All Tools
            </Button>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
