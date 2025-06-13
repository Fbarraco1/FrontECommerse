import { IProduct } from "./IProduct";
import { ITalle } from "./ITalle";
import { IType } from "./IType";

export interface ICategory {
  id: number;
  nombre: string;
  tipo?: IType;
  productos: IProduct[];
  talles: ITalle[];
}
