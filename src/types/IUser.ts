import { IDireccion } from "./IDireccion";
import { IOrdenDeCompra } from "./IOrdenDeCompra";

export interface IUser {
  id: number;
  email: string;
  contrasenia: string;
  nombre: string;
  activo: boolean;
  direcciones: IDireccion[];
  ordenes: IOrdenDeCompra[];
}