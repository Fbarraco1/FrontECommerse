import axios from "axios";
import { API_URL } from "../utils/constants";

/**
 * Sube una imagen de producto al backend.
 * @param file Archivo de imagen (File o Blob)
 * @param productoId ID del producto al que pertenece la imagen
 * @param esPrincipal Si la imagen es principal (boolean)
 * @param orden Orden de la imagen (number)
 */
export const subirImagenProducto = async (
  file: File,
  productoId: number,
  esPrincipal: boolean,
  orden: number
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("productoId", productoId.toString());
  formData.append("esPrincipal", esPrincipal ? "true" : "false");
  formData.append("orden", orden.toString());

  try {
    const response = await axios.post(`${API_URL}/api/imagenes/subir`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir imagen del producto:", error);
    throw error;
  }
};