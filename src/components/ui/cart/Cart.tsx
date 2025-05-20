import { useCartStore } from "../../../store/cartStore";
import styles from "./Cart.module.css";

const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCartStore();

  // 💰 Calcular subtotal (suma de precios * cantidades)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🚚 Costo de envío fijo
  const shippingCost = 15;

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

            <button className={styles.checkoutButton}>Forma de pago →</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
