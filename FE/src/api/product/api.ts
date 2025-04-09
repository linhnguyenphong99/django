import api from "../../lib/axios";
import { Product } from "@/types/product";

interface FilterParams {
  categories?: string[];
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export const index = async (filters?: FilterParams): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters?.categories?.length) {
    params.append('categories', filters.categories.join(','));
  }
  if (filters?.tags?.length) {
    params.append('tags', filters.tags.join(','));
  }
  if (filters?.minPrice !== undefined) {
    params.append('minPrice', filters.minPrice.toString());
  }
  if (filters?.maxPrice !== undefined) {
    params.append('maxPrice', filters.maxPrice.toString());
  }

  const response = await api.get(`/product?${params.toString()}`);
  return response.data;
};

export const show = async (slug: string): Promise<Product> => {
  const response = await api.get(`/product/${slug}`);
  return response.data;
};
