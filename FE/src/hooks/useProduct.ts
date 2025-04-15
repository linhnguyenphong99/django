"use client";

import { index, show } from "@/api/product/api";
import { Product, ProductResponse } from "@/types/product";
import { useEffect, useState } from "react";

interface FilterParams {
  categories?: string[];
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}


export default function useProduct(filters?: FilterParams) {
  const [results, setResults] = useState<ProductResponse>({
    next: null,
    previous: null,
    results: [],
    total: 0,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    index(filters)
      .then((data) => setResults(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [filters]);

  return { results, loading };
}

export function useProductDetail(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await show(slug);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
}
