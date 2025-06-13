import { create } from "zustand";
import { ITalle } from "../types/ITalle";
import { getAllTalles } from "../http/talle";

interface ITalleStore {
  talles: ITalle[];
  fetchTalles: () => Promise<void>;
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
}));