import { useEffect, useState } from "react";
import { productStore } from "../../../store/productStore";
import { categoryStore } from "../../../store/categoryStore";
import { typeStore } from "../../../store/typeStore";
import styles from "./FilterPanel.module.css";

const FilterPanel = () => {
  const { filtros, setFiltros, coloresDisponibles, marcasDisponibles, rangosDePrecio } = productStore();
  const { categoriasFiltradas, fetchCategorias, filtrarCategoriasPorTipo } = categoryStore();
  const { tipos, fetchTipos } = typeStore();
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategorias();
    fetchTipos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros({ [name]: value });

    if (name === "tipo") {
      filtrarCategoriasPorTipo(Number(value));
    }
  };

return (
  <div>
    {/* Botón móvil para abrir el panel */}
    <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
      Filtros
    </button>

    <div className={`${styles.filterPanel} ${isOpen ? styles.open : ""}`}>
      {/* Select de Tipo */}
      <label>Tipo:</label>
      <select name="tipo" value={filtros.tipo || ""} onChange={handleChange}>
        <option value="">Todos</option>
        {tipos.map((tipo) => (
          <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
        ))}
      </select>

      {/* Categoría */}
      <label>Categoría:</label>
      <select name="categoria" value={filtros.categoria || ""} onChange={handleChange}>
        <option value="">Todas</option>
        {categoriasFiltradas.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}
      </select>

      {/* Color */}
      <label>Color:</label>
      <select name="color" value={filtros.color || ""} onChange={handleChange}>
        <option value="">Todos</option>
        {coloresDisponibles.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>

      {/* Marca */}
      <label>Marca:</label>
      <select name="marca" value={filtros.marca || ""} onChange={handleChange}>
        <option value="">Todas</option>
        {marcasDisponibles.map((marca) => (
          <option key={marca} value={marca}>{marca}</option>
        ))}
      </select>

      {/* Contenedor de precios */}
      <div className={styles.priceFilter}>
        <label>Precio Mín:</label>
        <input type="number" name="precioMin" value={filtros.precioMin || rangosDePrecio.min} onChange={handleChange} />

        <label>Precio Máx:</label>
        <input type="number" name="precioMax" value={filtros.precioMax || rangosDePrecio.max} onChange={handleChange} />
      </div>

     
    </div>
  </div>
);
};

export default FilterPanel;
