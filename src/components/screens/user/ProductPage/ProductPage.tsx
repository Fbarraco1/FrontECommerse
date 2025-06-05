import { useEffect } from "react";
import { productStore } from "../../../../store/productStore";
import FilterPanel from "../../../ui/FilterPanel/FilterPanel";
import { getAllProductos } from "../../../../http/product";

const ProductPage = () => {
    const { setArrayProductos, getProductosFiltrados } = productStore();

    useEffect(() => {
        getAllProductos().then((data) => {
            if (data) setArrayProductos(data);
        });
    }, []);

    const productosFiltrados = getProductosFiltrados();
    
    console.log("Productos Filtrados:", productosFiltrados); // Debugging

    return (
        <div>
            <h1>Productos</h1>
            <FilterPanel />
            <div className="product-list">
                {productosFiltrados.map(producto => (
                    <div key={producto.id} className="product-card">
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
