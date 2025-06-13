import { IProduct } from "./IProduct";

export interface ITalle {
  id: number;
  nombre: string;
  stock: number;
  producto: IProduct
}