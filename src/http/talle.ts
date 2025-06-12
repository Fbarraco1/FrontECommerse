import axios from "axios";
import { ITalle } from "../types/ITalle";
import { API_URL } from "../utils/constants";

export const getAllTalles = async (): Promise<ITalle[]> => {
  const response = await axios.get<ITalle[]>(`${API_URL}/talles`);
  return response.data;
};