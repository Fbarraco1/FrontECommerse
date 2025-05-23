    import { create } from "zustand";
    import { IProduct } from "../types/IProduct";

    interface IProductStore {
        productos: IProduct[]
        productoActivo: IProduct | null
        setProductoActivo: (productoActivo: IProduct | null) => void
        setArrayProductos: (arrayDeProductos: IProduct[]) => void
        agregarNuevoProducto: (nuevoProducto: IProduct) => void
        editarUnProducto: (productoActualizado: IProduct) => void
        eliminarUnProducto: (idProducto: string | number) => void
    }

    export const productStore = create<IProductStore>((set) => ({
        productos: [],
        productoActivo: null,

        setArrayProductos: (arrayDeProductos) => set(() => ({ productos: arrayDeProductos })),
        agregarNuevoProducto: (nuevoProducto) => set((state) => ({ productos: [...state.productos, nuevoProducto] })),
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