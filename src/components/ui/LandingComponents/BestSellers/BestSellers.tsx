import { ProductSection } from "../ProductSection/ProductSection";

export const BestSellers = () => {
  const handleViewAll = () => {
    // lógica para ir a página de más vendidos
    console.log("Ver todos los más vendidos");
  };

  return <ProductSection title="MÁS VENDIDOS" onViewAll={handleViewAll} />;
};
