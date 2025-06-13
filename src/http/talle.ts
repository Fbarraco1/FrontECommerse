import axios from "axios";
import { ITalle } from "../types/ITalle";
import { API_URL } from "../utils/constants";
import { INuevoTalle } from "../types/INuevoTalle";

export const getAllTalles = async (): Promise<ITalle[]> => {
  const response = await axios.get<ITalle[]>(`${API_URL}/talles`);
  return response.data;
};

export const postNuevoTalle = async (nuevoTalle: INuevoTalle) => {
  const response = await axios.post<ITalle>(`${API_URL}/talles`, nuevoTalle);
  return response.data;
};