import { IDireccion } from "./IDireccion";
import { IDetalleOrden } from "./IDetalleOrden";



export interface IOrdenDeCompra {
  id: number;
  usuario: number; // o IUser si necesitas el objeto completo
  direccionEntrega: IDireccion;
  fecha: string; // formato ISO (LocalDate)
  detalle: IDetalleOrden[];
}