import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { useCartStore } from "../../../store/cartStore";
import { IProduct } from "../../../types/IProduct";
import { getProductoPorId } from "../../../http/product";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // Se mantiene la selección de talle
  const [quantity, setQuantity] = useState(1);

 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const data = await getProductoPorId(id!);

      if (!data) {
        console.error("No se encontró el producto");
        return;
      }

      setProduct(data);

      // Imagen principal o la primera disponible
      const principal = data.imagenes.find((img) => img.esPrincipal);
      setSelectedImage(principal ? principal.url : data.imagenes[0]?.url || "");
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.nombre,
      price: product.precio,
      quantity,
      imageUrl: selectedImage,
      size: selectedSize,
      color: product.color, // Se obtiene directamente del producto
    });
  };

  return (
    <div className={styles.container}>
      {/* Galería lateral */}
      <div className={styles.galleryColumn}>
        {product.imagenes.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.nombre}
            onClick={() => setSelectedImage(img.url)}
            className={`${styles.thumbnail} ${
              selectedImage === img.url ? styles.activeThumbnail : ""
            }`}
          />
        ))}
      </div>

      {/* Imagen principal */}
      <div className={styles.mainImage}>
        <img src={selectedImage} alt="Producto principal" />
      </div>

      {/* Detalles */}
      <div className={styles.details}>
        <h1 className={styles.title}>{product.nombre}</h1>
        <p className={styles.brand}>Marca: {product.marca}</p>
        <p className={styles.category}>Categoría: {product.categoria.nombre}</p>
        <p className={styles.color}>Color: {product.color}</p>
        <p className={styles.price}>${product.precio.toLocaleString()}</p>
        <p className={styles.description}>{product.descripcion}</p>

        {/* Selección de Talle */}
        <div className={styles.section}>
          <span>Seleccionar Talle:</span>
          <div className={styles.sizes}>
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${
                  selectedSize === size ? styles.activeSize : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className={styles.quantitySection}>
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        {/* Agregar al carrito */}
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
