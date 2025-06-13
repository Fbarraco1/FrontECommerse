import { create } from "zustand";
import { ITalle } from "../types/ITalle";
import { getAllTalles } from "../http/talle";
import { postNuevoTalle } from "../http/talle"; 
import { INuevoTalle } from "../types/INuevoTalle";

interface ITalleStore {
  talles: ITalle[];
  fetchTalles: () => Promise<void>;
  crearTalle: (nuevoTalle: INuevoTalle) => Promise<void>; 
}

export const tallestore = create<ITalleStore>((set) => ({
  talles: [],
  fetchTalles: async () => {
    try {
      const data = await getAllTalles();
      set({ talles: data });
    } catch (error) {
      console.error("Error al obtener talles:", error);
      set({ talles: [] });
    }
  },
  crearTalle: async (nuevoTalle) => {
    try {
      const talleCreado = await postNuevoTalle(nuevoTalle);
      set((state) => ({ talles: [...state.talles, talleCreado] }));
    } catch (error) {
      console.error("Error al crear talle:", error);
    }
  },
}));