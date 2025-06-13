import axios from "axios";
import { IDetalleOrden } from "../types/IDetalleOrden";

const API_URL = "http://localhost:9000/detalles";

// Obtener todos los detalles de orden
export const getAllDetalles = async (): Promise<IDetalleOrden[]> => {
  const res = await axios.get<IDetalleOrden[]>(API_URL);
  return res.data;
}

// Obtener un detalle de orden por ID
export const getDetalleById = async (id: number): Promise<IDetalleOrden> => {
  const res = await axios.get<IDetalleOrden>(`${API_URL}/${id}`);
  return res.data;
}

// Crear un nuevo detalle de orden
export const createDetalle = async (detalle: Omit<IDetalleOrden, "id">): Promise<IDetalleOrden> => {
  const res = await axios.post<IDetalleOrden>(API_URL, detalle);
  return res.data;
}

// Actualizar un detalle de orden existente
export const updateDetalle = async (id: number, detalle: Partial<IDetalleOrden>): Promise<IDetalleOrden> => {
  const res = await axios.put<IDetalleOrden>(`${API_URL}/${id}`, detalle);
  return res.data;
}

// Eliminar un detalle de orden
export const deleteDetalle = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}