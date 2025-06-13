import { useCartStore } from "../../../store/cartStore";
import styles from "./Cart.module.css";

const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  // 💰 Calcular subtotal (suma de precios * cantidades)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🚚 Costo de envío fijo
  const shippingCost = 15;

  // Función para crear preferencia y redirigir a Mercado Pago
  // handleCheckout modificado:
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const productsForBackend = items.map((item) => ({
        id: item.id,
        nombre: item.name,
        descripcion: item.name,
        cantidad: item.quantity,
        precio: item.price,
        color: item.color,
        marca: "",
      }));

      const token = localStorage.getItem("token");

      if (!token) {
        alert("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      const body = {
        items: productsForBackend,
      };

      const response = await fetch("http://localhost:9000/api/pagos/crear-preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.initPoint) {
        clearCart(); // ← Vacía el carrito aquí
        window.location.href = data.initPoint;
      } else {
        alert("Error al crear la preferencia de pago");
        console.error("Respuesta backend:", data);
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Ocurrió un error al procesar el pago");
    }
  };

  return (
    <div className={styles.cartContainer}>
      {/* 🛒 Lista de productos */}
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.cartImage} />
                <div className={styles.cartInfo}>
                  <h3>{item.name}</h3>
                  <p>Talle: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p>${item.price.toFixed(2)}</p>

                  <div className={styles.cartControls}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 🧾 Resumen de compra */}
          <div className={styles.summary}>
            <h2>Total de la compra</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>${(subtotal + shippingCost).toFixed(2)}</span>
            </div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Forma de pago →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
