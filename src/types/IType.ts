import { ICategory } from "./ICategory";

export interface IType {
  id: number;
  nombre: string;
  categorias: ICategory[];
}