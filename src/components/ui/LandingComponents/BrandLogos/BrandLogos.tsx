// BrandLogos.tsx - Versión alternativa
import { useEffect, useRef } from 'react';
import styles from "./BrandLogos.module.css";
import Armani from "../../../../assets/Armani.png";
import TomFord from "../../../../assets/TomFord.jpg";
import HugoBoss from "../../../../assets/HugoBoss.png";
import SportsMan from "../../../../assets/SportsMan.png";

export const BrandLogos = () => {
  const logos = [
    { src: Armani, alt: "Armani" },
    { src: TomFord, alt: "Tom Ford" },
    { src: HugoBoss, alt: "Hugo Boss" },
    { src: SportsMan, alt: "SportsMan" }
  ];
  
  return (
    <div className={styles.marcas}>
      <div className={styles.carouselTrack}>
        {/* Primera copia de logos */}
        {logos.map((logo, index) => (
          <div className={styles.logoItem} key={`logo-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
        
        {/* Segunda copia de logos para crear el efecto infinito */}
        {logos.map((logo, index) => (
          <div className={styles.logoItem} key={`logo-dup-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};