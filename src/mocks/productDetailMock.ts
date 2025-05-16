import img1 from "../assets/ProductDetail1.png";
import img2 from "../assets/ProductDetail2.png";
import img3 from "../assets/ProductDetail3.png";

export const mockProduct = {
  id: 1,
  nombre: "Luxury Twill O'Connor Tuxedo",
  cantidad: 10,
  precio: 6950,
  descripcion:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  color: "Negro",
  marca: "Tom Ford",
  categoria: {
    id: 1,
    nombre: "T-shirts",
  },
  imagenes: [
    img1,
    img2,
    img3,
  ],
 coloresDisponibles: ["#000000", "#2C3E50", "#34495E"],
  tallesDisponibles: ["Small", "Medium", "Large", "X-Large"]
};