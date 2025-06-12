// services/category.ts
import axios from "axios";
import { ICategory } from "../types/ICategory";
import { API_URL } from "../utils/constants";

export const getAllCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get<ICategory[]>(`${API_URL}/categorias`);
  return response.data;
};

export const createCategory = async (category: { nombre: string }): Promise<ICategory> => {
  const response = await axios.post<ICategory>(`${API_URL}/categorias`, category);
  return response.data;
};