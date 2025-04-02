import api from "../../lib/axios";
import { Product } from "@/types/product";

export const index = async (): Promise<Product[]> => {
  const response = await api.get("/product");
  return response.data;
};

export const show = async (id: string): Promise<Product> => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
