import { ProductSection } from "../ProductSection/ProductSection";

export const NewArrivals = () => {
  const handleViewAll = () => {
    // lógica para ir a página de novedades, por ejemplo
    console.log("Ver todas las novedades");
  };

  return <ProductSection title="NOVEDADES" onViewAll={handleViewAll} />;
};
