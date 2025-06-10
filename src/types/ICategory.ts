import { IProduct } from "./IProduct";
import { IType } from "./IType";

export interface ICategory {
  id: number;
  nombre: string;
  tipo?: IType;
  productos: IProduct[];
}
