import { useEffect, useState } from "react";
import styles from "./ModalTalleProducto.module.css";
import {
  getTallesPorProducto,
  crearTalleProducto,
} from "../../../../http/talleProducto";
import { ITalleProducto } from "../../../../types/ITalleProducto";
import { ITalle } from "../../../../types/ITalle";

interface ModalTallesProductoProps {
  productoId: number;
  tallesDisponibles: ITalle[];
  onClose: () => void;
}

export const ModalTallesProducto = ({
  productoId,
  tallesDisponibles,
  onClose,
}: ModalTallesProductoProps) => {
  const [talles, setTalles] = useState<ITalleProducto[]>([]);
  const [cantidades, setCantidades] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchTalles = async () => {
      const tallesData = await getTallesPorProducto(productoId);
      setTalles(tallesData);
      const cantidadesIniciales = tallesData.reduce((acc, tp) => {
        if (tp.talle && typeof tp.talle.id === "number") {
          acc[tp.talle.id] = tp.cantidad;
        }
        return acc;
      }, {} as Record<number, number>);
      setCantidades(cantidadesIniciales);
    };

    fetchTalles();
  }, [productoId]);

  const handleCantidadChange = (talleId: number, value: string) => {
    const cantidad = parseInt(value);
    if (!isNaN(cantidad)) {
      setCantidades((prev) => ({ ...prev, [talleId]: cantidad }));
    }
  };

  const guardarCambios = async () => {
    for (const talle of tallesDisponibles) {
      const cantidad = cantidades[talle.id] || 0;
      const talleProducto: ITalleProducto = {
        producto: { id: productoId },
        talle,
        cantidad,
      };
      await crearTalleProducto(talleProducto);
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Talles del Producto</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Talle</th>
              <th>Tipo</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {tallesDisponibles.map((talle) => (
              <tr key={talle.id}>
                <td>{talle.tipoTalle}</td>
                <td>{talle.tipo.nombre}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={cantidades[talle.id] || 0}
                    onChange={(e) =>
                      handleCantidadChange(talle.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={guardarCambios}>
            Guardar
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
