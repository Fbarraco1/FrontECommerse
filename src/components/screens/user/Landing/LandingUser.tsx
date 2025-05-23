import { useEffect } from "react";
import { productStore } from "../../../../store/productStore";
import { Footer } from "../../../ui/footer/Footer";
import { Header } from "../../../ui/header/Header";
import { CategoriesBanner } from "../../../ui/LandingComponents/Banners/CategoriesBanner/CategoriesBanner";
import { PrincipalBanner } from "../../../ui/LandingComponents/Banners/PrincipalBanner/PrincipalBanner";
import { BestSellers } from "../../../ui/LandingComponents/BestSellers/BestSellers";
import { BrandLogos } from "../../../ui/LandingComponents/BrandLogos/BrandLogos";
import { NewArrivals } from "../../../ui/LandingComponents/NewArrivals/NewArrivals";
import { getAllProductos } from "../../../../http/product";

export const LandingUser = () => {
  const setArrayProductos = productStore((state) => state.setArrayProductos);

  useEffect(() => {
    getAllProductos()
      .then((productos) => {
        if (productos) setArrayProductos(productos);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
      });
  }, []);
  
  return (
    <>
    <Header/>
      <PrincipalBanner />
      <BrandLogos />
      <NewArrivals />
      <BestSellers />
      <CategoriesBanner />
      <Footer/>
    </>
  );
};
