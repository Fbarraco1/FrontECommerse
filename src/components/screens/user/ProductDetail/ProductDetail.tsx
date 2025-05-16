import { useState } from "react";
import styles from "./ProductDetail.module.css";
import { mockProduct } from "../../../../mocks/productDetailMock";

export const ProductDetail = () => {


  const product = mockProduct;
  const [selectedImage, setSelectedImage] = useState(product.imagenes[0]);
  const [selectedColor, setSelectedColor] = useState(product.coloresDisponibles[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Producto agregado:", {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  return (
    <div className={styles.container}>
      {/* Galería lateral */}
      <div className={styles.galleryColumn}>
        {product.imagenes.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Producto ${index}`}
            onClick={() => setSelectedImage(img)}
            className={`${styles.thumbnail} ${
              selectedImage === img ? styles.activeThumbnail : ""
            }`}
          />
        ))}
      </div>

      {/* Imagen principal */}
      <div className={styles.mainImage}>
        <img src={selectedImage} alt="Producto principal" />
      </div>

      {/* Detalles del producto */}
      <div className={styles.details}>
        <h1 className={styles.title}>{product.nombre}</h1>
        <p className={styles.code}>Código: {product.id}</p>
        <p className={styles.price}>${product.precio.toLocaleString()}</p>
        <p className={styles.description}>{product.descripcion}</p>

        <div className={styles.section}>
          <span>Colores disponibles:</span>
          <div className={styles.colors}>
            {product.coloresDisponibles.map((color, i) => (
              <button
                key={i}
                style={{ backgroundColor: color }}
                className={`${styles.colorButton} ${
                  selectedColor === color ? styles.activeColor : ""
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span>Seleccionar Talle:</span>
          <div className={styles.sizes}>
            {product.tallesDisponibles.map((size, i) => (
              <button
                key={i}
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

        <div className={styles.quantitySection}>
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
