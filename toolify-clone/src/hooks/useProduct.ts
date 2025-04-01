"use client"; // Vì dùng useEffect

import { index } from "@/api/product/api";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function useProduct() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    index()
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { product, loading };
}
