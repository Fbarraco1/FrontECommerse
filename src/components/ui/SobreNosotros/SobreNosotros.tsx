import React from "react";
import styles from "./SobreNosotros.module.css";

const SobreNosotros: React.FC = () => {
  return (
    <section className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>Sobre Nosotros</h1>

      <p className={styles.aboutParagraph}>
        <strong>ChispaSuits</strong> es mucho más que una tienda online. Es el resultado de años de amistad, trabajo duro,
        creatividad y una pasión compartida por la tecnología y el estilo. Somos <strong>JavaChispas</strong>, un grupo de amigos
        que se conoció en la facultad estudiando programación, y desde entonces no dejamos de crear juntos.
      </p>

      <h2 className={styles.aboutSubtitle}>Nuestro equipo</h2>
      <ul className={styles.aboutList}>
        <li><strong>Francisco Barraco</strong> (21 años)</li>
        <li><strong>Franco Sardi</strong> (20 años)</li>
        <li><strong>Juan Emilio Frery</strong> (20 años)</li>
        <li><strong>Joaquín Redondo</strong> (20 años)</li>
      </ul>

      <p className={styles.aboutParagraph}>
        Desde las primeras cursadas hasta los últimos proyectos finales, nos mantuvimos unidos como equipo, enfrentando desafíos,
        compartiendo conocimientos y soñando con construir algo propio. Lo que empezó como un grupo de estudio se transformó en
        una hermandad de código. <strong>JavaChispas</strong> no es solo un nombre: es nuestra identidad, un símbolo de cómo una pequeña
        chispa de idea puede crecer hasta convertirse en algo grande.
      </p>

      <h2 className={styles.aboutSubtitle}>ChispaSuits: donde la calle se encuentra con la elegancia</h2>
      <p className={styles.aboutParagraph}>
        La idea de <strong>ChispaSuits</strong> nació de una inspiración tan inesperada como poderosa: <strong>Segundo Alejandro Castillo</strong>,
        exjugador y actual técnico de un equipo de fútbol colombiano. Para nosotros, Castillo representa una figura única: alguien con raíces
        en la calle, con garra, humildad y carácter, pero que nunca pierde el estilo. Siempre viste con elegancia en los partidos, transmitiendo
        presencia y respeto sin renunciar a su esencia.
      </p>

      <p className={styles.aboutParagraph}>
        Esa dualidad fue nuestro punto de partida. Queríamos crear un ecommerce que representara lo mismo: <em>moda urbana con clase,
        prendas que combinen actitud y elegancia</em>, pensadas para personas que se mueven por el mundo con personalidad pero sin perder el refinamiento.
      </p>

      <h2 className={styles.aboutSubtitle}>Más que desarrolladores, somos creadores</h2>
      <p className={styles.aboutParagraph}>
        Cada línea de código, cada detalle del diseño de la tienda, cada foto de producto y cada texto que ves en <strong>ChispaSuits</strong> fue hecho por nosotros.
        No contratamos agencias. No seguimos moldes. Construimos desde cero, aprendiendo en el camino, aplicando todo lo que nos enseñaron —y mucho más
        de lo que aprendimos fuera del aula— para que esta tienda sea reflejo de quiénes somos.
      </p>

      <p className={styles.aboutParagraph}>
        Creemos que la moda puede ser una forma de expresión, de identidad. Y también creemos que la tecnología puede ser la mejor aliada para llevar eso al mundo.
        <strong> ChispaSuits</strong> es el punto donde ambos mundos se encuentran.
      </p>

      <h2 className={styles.aboutSubtitle}>Lo que viene</h2>
      <p className={styles.aboutParagraph}>
        Estamos por terminar la carrera, pero sabemos que esto recién empieza. <strong>ChispaSuits</strong> es nuestro primer gran paso hacia lo que soñamos:
        seguir emprendiendo, seguir creando, seguir creciendo como equipo y como profesionales.
      </p>

      <p className={styles.aboutParagraph}>
        Gracias por formar parte de esta historia. Si llegaste hasta acá, ya sos parte de la chispa.
      </p>
    </section>
  );
};

export default SobreNosotros;