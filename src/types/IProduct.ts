import { ICategory } from "./ICategory";

// types/IProduct.ts
export interface IProduct {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: ImagenProducto[];
  categoria: ICategory;
}

export interface ImagenProducto {
  id: number;
  url: string;
  nombre: string;
  esPrincipal: boolean;
  orden: number;
}
