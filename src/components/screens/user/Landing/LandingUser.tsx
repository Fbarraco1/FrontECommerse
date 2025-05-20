import { Footer } from "../../../ui/footer/Footer";
import { Header } from "../../../ui/header/Header";
import { CategoriesBanner } from "../../../ui/LandingComponents/Banners/CategoriesBanner/CategoriesBanner";
import { PrincipalBanner } from "../../../ui/LandingComponents/Banners/PrincipalBanner/PrincipalBanner";
import { BestSellers } from "../../../ui/LandingComponents/BestSellers/BestSellers";
import { BrandLogos } from "../../../ui/LandingComponents/BrandLogos/BrandLogos";
import { NewArrivals } from "../../../ui/LandingComponents/NewArrivals/NewArrivals";

export const LandingUser = () => {
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
