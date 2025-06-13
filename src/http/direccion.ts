import axios from "axios";
import { IDireccion } from "../types/IDireccion";

const API_URL = "http://localhost:9000/direcciones";

// Helper para obtener el token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

// Obtener todas las direcciones
export const getAllDirecciones = async (): Promise<IDireccion[]> => {
  const res = await axios.get<IDireccion[]>(API_URL, getAuthHeaders());
  return res.data;
}

// Obtener una dirección por ID
export const getDireccionById = async (id: number): Promise<IDireccion> => {
  const res = await axios.get<IDireccion>(`${API_URL}/${id}`, getAuthHeaders());
  return res.data;
}

// Crear una nueva dirección
export const createDireccion = async (direccion: Omit<IDireccion, "id">): Promise<IDireccion> => {
  const res = await axios.post<IDireccion>(API_URL, direccion, getAuthHeaders());
  return res.data;
}

// Actualizar una dirección existente
export const updateDireccion = async (id: number, direccion: Partial<IDireccion>): Promise<IDireccion> => {
  const res = await axios.put<IDireccion>(`${API_URL}/${id}`, direccion, getAuthHeaders());
  return res.data;
}

// Eliminar una dirección
export const deleteDireccion = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
}