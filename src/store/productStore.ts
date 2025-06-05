    import { create } from "zustand";
    import { IProduct } from "../types/IProduct";

    interface IProductStore {
        productos: IProduct[]
        productoActivo: IProduct | null
        filtros: { categoria: string | null; talle: number | null };
        setProductoActivo: (productoActivo: IProduct | null) => void
        setArrayProductos: (arrayDeProductos: IProduct[]) => void
        setFiltros: (filtros: { categoria: string | null; talle: number | null }) => void;
        getProductosFiltrados: () => IProduct[];
        agregarNuevoProducto: (nuevoProducto: IProduct) => void
        editarUnProducto: (productoActualizado: IProduct) => void
        eliminarUnProducto: (idProducto: string | number) => void
    }

    export const productStore = create<IProductStore>((set,get) => ({
        productos: [],
        productoActivo: null,
         filtros: { categoria: null, talle: null },

        setArrayProductos: (arrayDeProductos) => set(() => ({ productos: arrayDeProductos })),
        agregarNuevoProducto: (nuevoProducto) => set((state) => ({ productos: [...state.productos, nuevoProducto] })),
        setFiltros: (filtros) => set(() => ({ filtros })),
        getProductosFiltrados: () => {
        const { productos, filtros } = get();
        return productos.filter(producto => 
            (!filtros.categoria || producto.categoria.nombre === filtros.categoria) &&
            (!filtros.talle || producto.descripcion.includes(`Talla ${filtros.talle}`))
        );
        },
        editarUnProducto: (productoEditado) => 
            set((state) => {
                const arregloProductos = state.productos.map((producto) => 
                    producto.id === productoEditado.id ? { ...producto, ...productoEditado } : producto
                );
                return { productos: arregloProductos };
            }),

        eliminarUnProducto: (idProducto) => 
            set((state) => {
                const arregloProductos = state.productos.filter((producto) => producto.id !== idProducto);
                return { productos: arregloProductos };
            }),

        setProductoActivo: (productoActivoIn) => set(() => ({ productoActivo: productoActivoIn })),
        
    }));