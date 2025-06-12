// types/ITalleProducto.ts
import { ITalle } from "./ITalle";

export interface ITalleProducto {
  id?: number;
  producto: {
    id: number;
  };
  talle: ITalle;
  cantidad: number;
}