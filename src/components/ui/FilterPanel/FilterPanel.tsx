import { productStore } from "../../../store/productStore"; 

const FilterPanel = () => {
    const { filtros, setFiltros } = productStore();

    return (
        <div className="filter-panel">
            <label>Categoría:</label>
            <select
                value={filtros.categoria || ""}
                onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            >
                <option value="">Todas</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Ropa">Ropa</option>
            </select>

            <label>Talla:</label>
            <select
                value={filtros.talle || ""}
                onChange={(e) => setFiltros({ ...filtros, talle: Number(e.target.value) })}
            >
                <option value="">Todas</option>
                <option value="42">42</option>
                <option value="43">43</option>
            </select>
        </div>
    );
};

export default FilterPanel;
