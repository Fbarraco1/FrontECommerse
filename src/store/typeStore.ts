// stores/typeStore.ts
import { create } from "zustand";
import { IType } from "../types/IType";
import { getAllTypes } from "../http/type";

interface ITypeStore {
  tipos: IType[];
  fetchTipos: () => Promise<void>;
}

export const typeStore = create<ITypeStore>((set) => ({
  tipos: [],
  fetchTipos: async () => {
    const data = await getAllTypes();
    set({ tipos: data });
  }
}));
