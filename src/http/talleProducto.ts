import axios from "axios";
import { ITalleProducto } from "../types/ITalleProducto";
import { API_URL } from "../utils/constants";

// ✅ GET: Obtener todos los talles asociados a un producto
export const getTallesPorProducto = async (productoId: number): Promise<ITalleProducto[]> => {
  try {
    const response = await axios.get<ITalleProducto[]>(`${API_URL}/talleproductos/producto/${productoId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener talles del producto:", error);
    return [];
  }
};

// ✅ POST: Crear o actualizar un talleProducto
export const crearTalleProducto = async (nuevo: ITalleProducto): Promise<ITalleProducto | undefined> => {
  try {
    const response = await axios.post<ITalleProducto>(`${API_URL}/talleproductos`, nuevo);
    return response.data;
  } catch (error) {
    console.error("❌ Error creando TalleProducto:", error);
    return undefined;
  }
};