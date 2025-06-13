import axios from "axios";
import { IUser } from "../types/IUser";

const API_URL = "http://localhost:9000/usuarios";


  // Obtener todos los usuarios
  export const getAllUsuarios = async (): Promise<IUser[]> => {
    const res = await axios.get<IUser[]>(API_URL);
    return res.data;
  }

  // Obtener un usuario por ID
  export const getUsuarioById = async (id: number): Promise<IUser> => {
    const res = await axios.get<IUser>(`${API_URL}/${id}`);
    return res.data;
  }

  // Crear un nuevo usuario
  export const createUsuario = async (usuario: Omit<IUser, "id">): Promise<IUser> => {
    const res = await axios.post<IUser>(API_URL, usuario);
    return res.data;
  }

  // Actualizar un usuario existente
  export const updateUsuario = async (id: number, usuario: Partial<IUser>): Promise<IUser> => {
    const res = await axios.put<IUser>(`${API_URL}/${id}`, usuario);
    return res.data;
  }

  // Eliminar un usuario
  export const deleteUsuario =  async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
