import axios from "axios";
import { IProduct } from "../types/IProduct";
import { API_URL } from "../../src/utils/constants"

export const getAllProductos = async () => {
    try {
        const response = await axios.get<IProduct[]>(`${API_URL}/${"productos"}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting productos:", error);
    }
};

export const getProductoPorId = async (id: string | number) => {
    try {
        const response = await axios.get<IProduct>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting producto por ID:", error);
    }
};

export const postNuevoProducto = async (nuevoProducto: IProduct) => {
    try {
        const response = await axios.post<IProduct>(`${API_URL}`, nuevoProducto);
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