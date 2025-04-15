import api from "../../lib/axios";
import { Product, ProductResponse } from "@/types/product";

interface FilterParams {
  categories?: string[];
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export const index = async (filters?: FilterParams): Promise<ProductResponse> => {
  const response = await api.get(`/product`, { params: filters });
  return response.data;
};

export const show = async (slug: string): Promise<Product> => {
  const response = await api.get(`/product/${slug}`);
  return response.data;
};
