export interface Product {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  descripcion: string;
  color: string;
  marca: string;
  categoria: {
    id: number;
    nombre: string;
  };
  imagenes: string[]; // puedes agregar esto luego a tu entidad o hacer una relación aparte
}