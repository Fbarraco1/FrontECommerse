// stores/typeStore.ts
import { create } from "zustand";
import { IType } from "../types/IType";
import { getAllTypes, postNuevoTipo } from "../http/type";

interface ITypeStore {
  tipos: IType[];
  fetchTipos: () => Promise<void>;
  crearTipo: (nuevoTipo: Omit<IType, "id">) => Promise<void>; // <--- agrega esto
}

export const typeStore = create<ITypeStore>((set, _get) => ({
  tipos: [],
  fetchTipos: async () => {
    const data = await getAllTypes();
    set({ tipos: data });
  },
  crearTipo: async (nuevoTipo) => {
    const tipoCreado = await postNuevoTipo(nuevoTipo);
    set((state) => ({ tipos: [...state.tipos, tipoCreado] }));
  }
}));
