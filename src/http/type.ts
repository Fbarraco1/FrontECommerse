// services/type.ts
import axios from "axios";
import { IType } from "../types/IType";
import { API_URL } from "../utils/constants";

export const getAllTypes = async (): Promise<IType[]> => {
  const response = await axios.get<IType[]>(`${API_URL}/tipos`);
  return response.data;
};