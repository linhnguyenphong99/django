import api from "../../lib/axios";
import { Product } from "@/types/product";

export const index = async (): Promise<Product[]> => {
  const params = {}
  const response = await api.get("/product", {params})
  return response.data
};

export const show = async (slug: string): Promise<Product> => {
  const response = await api.get(`/product/${slug}`);
  return response.data;
};
