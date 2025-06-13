import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { productosFiltrados, productosFiltradosPorNombre} from "../http/product";

interface IFilters {
  tipo?: number;
  categoria?: number;
  color?: string;
  marca?: string;
  precioMin?: number;
  precioMax?: number;
  nombre?: string;

}

interface IProductStore {
  productos: IProduct[];
  productoActivo: IProduct | null;
  setProductoActivo: (productoActivo: IProduct | null) => void;
  setArrayProductos: (arrayDeProductos: IProduct[]) => void;
  filtros: IFilters;
  setFiltros: (nuevoFiltro: Partial<IFilters>) => void;
  aplicarFiltros: () => Promise<void>;

  // Nuevos estados para valores dinámicos
  coloresDisponibles: string[];
  marcasDisponibles: string[];
  rangosDePrecio: { min: number; max: number };
  
  // Nuevos métodos que faltaban en la interfaz
  agregarNuevoProducto: (nuevoProducto: IProduct) => void;
  editarUnProducto: (productoEditado: IProduct) => void;
  eeliminarUnProducto: (idProducto: number) => void;
}

export const productStore = create<IProductStore>((set, get) => ({
  productos: [],
  productoActivo: null,
  filtros: {},

  coloresDisponibles: [],
  marcasDisponibles: [],
  rangosDePrecio: { min: 0, max: 100000 },

  setFiltros: (nuevoFiltro) => {
    set((state) => ({
      filtros: { ...state.filtros, ...nuevoFiltro },
    }));
  },

  filtrarPorNombre: async (nombre: string) => {
    console.log("🔍 Filtrando por nombre:", nombre);
    const productos = await productosFiltradosPorNombre(nombre);
    set({ productos });
  },

  aplicarFiltros: async () => {
  const filtros = get().filtros;
  const queryParams = new URLSearchParams();

  // Mapear los nombres de parámetros del frontend al backend
  const paramMapping: Record<string, string> = {
    tipo: 'tipoId',           // frontend -> backend
    categoria: 'categoriaId', // frontend -> backend
    color: 'color',           // igual
    marca: 'marca',           // igual
    precioMin: 'precioMin',   // igual
    precioMax: 'precioMax'    // igual
  };

  if (filtros.nombre) {
    // ✅ Si hay un filtro por nombre, usar el nuevo endpoint
    console.log("🔍 Filtrando por nombre:", filtros.nombre);
    const productos = await productosFiltradosPorNombre(filtros.nombre);
    set({ productos });
    return;
  }

  Object.entries(filtros).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      const backendParamName = paramMapping[key] || key;
      queryParams.append(backendParamName, value.toString());
      console.log(`🔧 Mapeando: ${key} -> ${backendParamName} = ${value}`);
    }
  });

  const queryString = queryParams.toString();
  
  console.log("🔍 Query params enviados:", queryString);
  console.log("🔍 Filtros originales:", filtros);

  try {
    console.log("📡 Haciendo petición con params:", queryString);
    const response = await productosFiltrados(queryString);
    
    console.log("📦 Respuesta del backend:", response);
    console.log("📦 Tipo de response:", typeof response);
    console.log("📦 Es array?:", Array.isArray(response));

    const productos = Array.isArray(response) ? response : [];
    
    console.log("✅ Productos finales:", productos);
    console.log("✅ Cantidad de productos:", productos.length);

    set({ productos });

    // Solo procesar si hay productos
    if (productos.length > 0) {
      console.log("🎨 Procesando colores, marcas y precios...");
      
      const colores = [...new Set(productos.map((p: IProduct) => p.color))].filter(
        (c): c is string => typeof c === "string" && c.trim() !== ""
      );
      
      const marcas = [...new Set(productos.map((p: IProduct) => p.marca))].filter(
        (m): m is string => typeof m === "string" && m.trim() !== ""
      );
      
      const precios = productos
        .map((p: IProduct) => p.precio)
        .filter((precio): precio is number => typeof precio === "number" && !isNaN(precio));

      console.log("🎨 Colores encontrados:", colores);
      console.log("🏷️ Marcas encontradas:", marcas);
      console.log("💰 Precios encontrados:", precios);

      set({
        coloresDisponibles: colores,
        marcasDisponibles: marcas,
        rangosDePrecio: precios.length > 0 ? {
          min: Math.min(...precios),
          max: Math.max(...precios),
        } : { min: 0, max: 10000 },
      });
    } else {
      console.log("❌ No hay productos, reseteando valores dinámicos");
      set({
        coloresDisponibles: [],
        marcasDisponibles: [],
        rangosDePrecio: { min: 0, max: 10000 },
      });
    }
  } catch (error) {
    console.error("💥 Error al aplicar filtros:", error);
    if (error instanceof Error) {
      console.error("💥 Detalles del error:", error.message);
    } else {
      console.error("💥 Detalles del error:", error);
    }
    
    set({ 
      productos: [],
      coloresDisponibles: [],
      marcasDisponibles: [],
      rangosDePrecio: { min: 0, max: 10000 },
    });
  }
},

  setArrayProductos: (arrayDeProductos) => set(() => ({ productos: arrayDeProductos })),
  setProductoActivo: (productoActivoIn) => set(() => ({ productoActivo: productoActivoIn })),

  agregarNuevoProducto: (nuevoProducto: IProduct) =>
    set((state) => ({ productos: [...state.productos, nuevoProducto] })),

  editarUnProducto: (productoEditado: IProduct) =>
    set((state) => {
      const arregloProductos = state.productos.map((producto) =>
        producto.id === productoEditado.id ? { ...producto, ...productoEditado } : producto
      );
      return { productos: arregloProductos };
    }),

  eeliminarUnProducto: (idProducto: number) =>
    set((state) => {
      const arregloProductos = state.productos.filter((producto) => producto.id !== idProducto);
      return { productos: arregloProductos };
    }),
}));