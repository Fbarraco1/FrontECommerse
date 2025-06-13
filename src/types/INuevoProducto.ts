import { ICategory } from "./ICategory";
import { ImagenProducto } from "./IProduct";
import { ITalle } from "./ITalle";

export interface INuevoProducto {
  nombre: string;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  imagenes: ImagenProducto[];
  talles: ITalle[];
  categoria: ICategory;
}
