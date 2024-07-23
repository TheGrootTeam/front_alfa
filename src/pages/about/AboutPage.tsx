import Layout from "../../components/layout/Layout";
import styles from "./About.module.css";

export function AboutPage() {
  return (
    <>
      <Layout title="About" page="about">
        <p>Constaría en principio de tres secciones:</p>
        <ul className={styles.ul}>
          <li>
            <strong>Acerca del proyecto:</strong> arquitectura, pequeña introducción
          </li>
          <li>
            Relación de las distintas <strong>tecnologías utilizadas</strong>
          </li>
          <li>
            <strong>Sobre nosotros</strong>: tarjeta con info básica y enlaces a RRSS de cada uno
          </li>
        </ul>
      </Layout>
    </>
  );
}
