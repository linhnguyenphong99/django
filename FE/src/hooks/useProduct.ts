// "use client"; // Vì dùng useEffect

import { index, show } from "@/api/product/api";
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

export function useProductDetail(slug: string) {
  const productState: Product = {
    description: '',
    discount: '',
    get_absolute_url: '',
    id: '',
    image: '',
    name: '',
    price: '',
    slug: '',
  }
  const [product, setProduct] = useState<Product>(productState);

  useEffect(() => {
    show(slug)
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
  }, []);

  return product
}
