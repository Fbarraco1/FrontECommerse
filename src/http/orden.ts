import axios from "axios";
import { IOrdenDeCompra } from "../types/IOrdenDeCompra";

const API_URL = "http://localhost:9000/ordendecompra";

// Obtener todas las órdenes de compra
export const getAllOrdenes = async (): Promise<IOrdenDeCompra[]> => {
  const res = await axios.get<IOrdenDeCompra[]>(API_URL);
  return res.data;
}

// Obtener una orden de compra por ID
export const getOrdenById = async (id: number): Promise<IOrdenDeCompra> => {
  const res = await axios.get<IOrdenDeCompra>(`${API_URL}/${id}`);
  return res.data;
}

// Crear una nueva orden de compra
export const createOrden = async (orden: Omit<IOrdenDeCompra, "id">): Promise<IOrdenDeCompra> => {
  const res = await axios.post<IOrdenDeCompra>(`${API_URL}/create`, orden);
  return res.data;
}

// Actualizar una orden de compra existente
export const updateOrden = async (id: number, orden: Partial<IOrdenDeCompra>): Promise<IOrdenDeCompra> => {
  const res = await axios.put<IOrdenDeCompra>(`${API_URL}/${id}`, orden);
  return res.data;
}

// Eliminar una orden de compra
export const deleteOrden = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}