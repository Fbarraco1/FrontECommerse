import { useEffect, useState } from "react";
import { useCartStore } from "../../../store/cartStore";
import { getAllDirecciones, createDireccion } from "../../../http/direccion";
import { IDireccion } from "../../../types/IDireccion";
import styles from "./Cart.module.css";

const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  // Estado para direcciones y selección
  const [direcciones, setDirecciones] = useState<IDireccion[]>([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<number | null>(null);

  // Estado para crear nueva dirección
  const [nuevaDireccion, setNuevaDireccion] = useState({ calle: "", localidad: "", cp: "" });
  const [creandoDireccion, setCreandoDireccion] = useState(false);

  // Obtener direcciones del usuario al montar
  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        // Aquí deberías obtener el id del usuario autenticado
        // Por simplicidad, supongamos que el backend filtra por usuario autenticado
        const dirs = await getAllDirecciones();
        setDirecciones(dirs);
        if (dirs.length > 0) setDireccionSeleccionada(dirs[0].id);
      } catch (e) {
        setDirecciones([]);
      }
    };
    fetchDirecciones();
  }, []);

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
    if (!direccionSeleccionada) {
      alert("Selecciona una dirección de entrega");
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
        direccionId: direccionSeleccionada,
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

  // Función para crear una nueva dirección
  const handleCrearDireccion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const usuarioId = user.id;
      const nueva = await createDireccion({ ...nuevaDireccion, usuarioId });
      setDirecciones((prev) => [...prev, nueva]);
      setDireccionSeleccionada(nueva.id);
      setNuevaDireccion({ calle: "", localidad: "", cp: "" });
      setCreandoDireccion(false);
    } catch (e) {
      alert("Error al crear dirección");
    }
  };

  return (
    <div className={styles.cartContainer}>
      {/* Selección de dirección */}
      <div className={styles.direccionBox}>
        <h3>Dirección de entrega</h3>
        {direcciones.length > 0 && !creandoDireccion ? (
          <>
            <select
              value={direccionSeleccionada ?? ""}
              onChange={e => setDireccionSeleccionada(Number(e.target.value))}
              className={styles.selectDireccion}
            >
              {direcciones.map(dir => (
                <option key={dir.id} value={dir.id}>
                  {dir.calle}, {dir.localidad}, CP {dir.cp}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setCreandoDireccion(true)}>
              + Nueva dirección
            </button>
          </>
        ) : (
          <form onSubmit={handleCrearDireccion} className={styles.formDireccion}>
            <input
              type="text"
              placeholder="Calle"
              value={nuevaDireccion.calle}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, calle: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Localidad"
              value={nuevaDireccion.localidad}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, localidad: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="CP"
              value={nuevaDireccion.cp}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, cp: e.target.value })}
              required
            />
            <button type="submit">Guardar dirección</button>
            {direcciones.length > 0 && (
              <button type="button" onClick={() => setCreandoDireccion(false)}>
                Cancelar
              </button>
            )}
          </form>
        )}
      </div>

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
