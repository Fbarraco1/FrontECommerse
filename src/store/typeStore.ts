// stores/typeStore.ts
import { create } from "zustand";
import { IType } from "../types/IType";
import { getAllTypes, postNuevoTipo, editarTipo as editarTipoApi } from "../http/type";

interface ITypeStore {
  tipos: IType[];
  fetchTipos: () => Promise<void>;
  crearTipo: (nuevoTipo: Omit<IType, "id">) => Promise<void>;
  editarTipo: (tipoActualizado: IType) => Promise<void>; // <--- agrega esto
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
  },
  editarTipo: async (tipoActualizado) => {
    const tipoEditado = await editarTipoApi(tipoActualizado);
    if (tipoEditado) {
      set((state) => ({
        tipos: state.tipos.map((t) =>
          t.id === tipoEditado.id ? tipoEditado : t
        ),
      }));
    }
  },
}));
