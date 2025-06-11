import { create } from "zustand";
import { ICategory } from "../types/ICategory";
import { createCategory, getAllCategories } from "../http/category";
import { getAllTypes } from "../http/type";

interface ICategoryStore {
  categorias: ICategory[];
  categoriasFiltradas: ICategory[];
  fetchCategorias: () => Promise<void>;
  filtrarCategoriasPorTipo: (tipoId: number | null) => void;
  crearCategoria: (categoria: ICategory) => Promise<void>; // 👈 Agrega esto
}

export const categoryStore = create<ICategoryStore>((set, get) => ({
  categorias: [],
  categoriasFiltradas: [],

  // 🟢 Cargar categorías y asignarles el tipo manualmente
  fetchCategorias: async () => {
    try {
      // Obtener categorías y tipos en paralelo
      const [categoriasData, tiposData] = await Promise.all([
        getAllCategories(),
        getAllTypes(),
      ]);

      // 🔄 Asociar tipo a cada categoría
      const categoriasConTipo = categoriasData.map((categoria): ICategory => {
        const tipoEncontrado = tiposData.find((tipo) =>
          tipo.categorias.some((cat: ICategory) => cat.id === categoria.id)
        );
        
        return {
          ...categoria,
          tipo: tipoEncontrado || undefined, // Usar el objeto completo IType o undefined
        };
      });

      console.log("📦 Categorías con tipo:", categoriasConTipo);

      set({
        categorias: categoriasConTipo,
        categoriasFiltradas: categoriasConTipo,
      });
    } catch (error) {
      console.error("❌ Error al obtener categorías o tipos:", error);
    }
  },

  // 🟡 Filtro por tipo de categoría
  filtrarCategoriasPorTipo: (tipoId) => {
    const { categorias } = get();
    
    if (!tipoId) {
      set({ categoriasFiltradas: categorias }); // Mostrar todas si no hay filtro
    } else {
      set({
        categoriasFiltradas: categorias.filter(
          (categoria) => categoria.tipo?.id === tipoId
        ),
      });
    }
  },

  crearCategoria: async (categoria) => {
    try {
      const nuevaCategoria = await createCategory(categoria);
      set((state) => ({
        categorias: [...state.categorias, nuevaCategoria],
        categoriasFiltradas: [...state.categoriasFiltradas, nuevaCategoria], 
      }));
    } catch (error) {
      console.error("❌ Error al crear categoría:", error);
    }
  },
}));