import axios from "axios";
import { IProduct } from "../types/IProduct";
import { API_URL } from "../../src/utils/constants"
import { INuevoProducto } from "../types/INuevoProducto";

export const getAllProductos = async () => {
    try {
        const response = await axios.get<IProduct[]>(`${API_URL}/${"productos"}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting productos:", error);
    }
};

export const getAllProductosAdmin = async () => {
    try {
        const response = await axios.get<IProduct[]>(`${API_URL}/productos/admin/productos`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting productos:", error);
    }
};

export const getProductoPorId = async (id: string | number): Promise<IProduct | undefined> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting producto por ID:", error);
    return undefined;
  }
};

 export const postNuevoProducto = async (nuevoProducto: INuevoProducto) => {
     try {
         const response = await axios.post<IProduct>(`${API_URL}/productos`, nuevoProducto);
         return response.data;
     } catch (error) {
         console.error("Error posting nuevo producto:", error);
     }
 };

 export const editarProducto = async (productoActualizado: IProduct) => {
     try {
         const response = await axios.put<IProduct>(`${API_URL}/${productoActualizado.id}`, {
             ...productoActualizado,
         });
         return response.data;
     } catch (error) {
         console.error("Error editando producto:", error);
     }
 };

 export const eliminarProductoPorID = async (idProducto: string | number) => {
     try {
         const response = await axios.delete<IProduct>(`${API_URL}/${idProducto}`);
         return response.data;
     } catch (error) {
         console.error("Error eliminando producto:", error);
     }
 };

export const productosFiltrados = async (queryParams: string) => {
  try {
    console.log("URL enviada al backend:", `${API_URL}/productos/filtrar?${queryParams}`); // Debug
    const response = await axios.get(`${API_URL}/productos/filtrar?${queryParams}`);
    console.log("Respuesta del backend:", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos filtrados:", error);
    return [];
  }
};