import { useEffect } from "react";
import { productStore } from "../../../store/productStore";
import { categoryStore } from "../../../store/categoryStore";
import { typeStore } from "../../../store/typeStore";
import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  const { filtros, setFiltros, aplicarFiltros, coloresDisponibles, marcasDisponibles, rangosDePrecio } = productStore();
  const { categoriasFiltradas, fetchCategorias, filtrarCategoriasPorTipo } = categoryStore();
  const { tipos, fetchTipos } = typeStore();

  // Cargar categorías y tipos al montar el componente
  useEffect(() => {
    fetchCategorias();
    fetchTipos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros({ [name]: value });

    if (name === "tipo") {
      filtrarCategoriasPorTipo(Number(value)); // Actualiza las categorías según el tipo seleccionado
    }
  };

  return (
    <div className={styles.filterPanel}>
      {/* Select de Tipo */}
      <label className={styles.label}>Tipo:</label>
      <select className={styles.select} name="tipo" value={filtros.tipo || ""} onChange={handleChange}>
        <option value="">Todos</option>
        {tipos.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>
            {tipo.nombre}
          </option>
        ))}
      </select>

      {/* Select de Categoría (filtrado dinámicamente según Tipo) */}
      <label className={styles.label}>Categoría:</label>
      <select className={styles.select} name="categoria" value={filtros.categoria || ""} onChange={handleChange}>
        <option value="">Todas</option>
        {categoriasFiltradas.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      {/* Select dinámico de Color */}
      <label className={styles.label}>Color:</label>
      <select className={styles.select} name="color" value={filtros.color || ""} onChange={handleChange}>
        <option value="">Todos</option>
        {coloresDisponibles.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      {/* Select dinámico de Marca */}
      <label className={styles.label}>Marca:</label>
      <select className={styles.select} name="marca" value={filtros.marca || ""} onChange={handleChange}>
        <option value="">Todas</option>
        {marcasDisponibles.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </select>

      {/* Inputs dinámicos para Precio */}
      <label className={styles.label}>Precio Mínimo:</label>
      <input
        className={styles.input}
        type="number"
        name="precioMin"
        value={filtros.precioMin || rangosDePrecio.min}
        onChange={handleChange}
      />

      <label className={styles.label}>Precio Máximo:</label>
      <input
        className={styles.input}
        type="number"
        name="precioMax"
        value={filtros.precioMax || rangosDePrecio.max}
        onChange={handleChange}
      />

      <button className={styles.button} onClick={aplicarFiltros}>
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FilterPanel;
