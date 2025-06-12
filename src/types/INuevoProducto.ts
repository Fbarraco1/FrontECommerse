import { ICategory } from "./ICategory";
import { ImagenProducto } from "./IProduct";

export interface INuevoProducto {
  nombre: string;
  cantidad: number;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: ImagenProducto[];
  categoria: ICategory;
}
