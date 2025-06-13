// services/type.ts
import axios from "axios";
import { IType } from "../types/IType";
import { API_URL } from "../utils/constants";

export const getAllTypes = async (): Promise<IType[]> => {
  const response = await axios.get<IType[]>(`${API_URL}/tipos`);
  return response.data;
};

export const postNuevoTipo = async (nuevoTipo: Omit<IType, "id">) => {
  const response = await axios.post<IType>(`${API_URL}/tipos`, nuevoTipo);
  return response.data;
};

export const editarTipo = async (tipoActualizado: IType) => {
     try {
         const response = await axios.put<IType>(`${API_URL}/tipos/${tipoActualizado.id}`, {
             ...tipoActualizado,
         });
         return response.data;
     } catch (error) {
         console.error("Error editando tipo:", error);
     }
 };

export const eliminarTipoPorID = async (idTipo: number) => {
  try {
      const response = await axios.delete<IType>(`${API_URL}/tipos/${idTipo}`);
      return response.data;
  } catch (error) {
    console.error("Error eliminando tipo por ID:", error);
  }

};