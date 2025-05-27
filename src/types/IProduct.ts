export interface IProduct {
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
  imagenes: ImagenProducto[]; // Ahora es un array de objetos
}

export interface ImagenProducto {
  id: number;
  url: string;
  nombre: string;
  esPrincipal: boolean;
  orden: number;
}
