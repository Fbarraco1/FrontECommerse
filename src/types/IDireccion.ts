export interface IDireccion {
  id: number;
  calle: string;
  localidad: string;
  cp: string;
  usuarioId: number; // Solo el id del usuario para evitar ciclos
}