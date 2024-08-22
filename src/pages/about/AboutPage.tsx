import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.about')} page="about">
        <p>
          <b>
            <i>* Los textos ya los traduciremos cuando sean los definitivos</i>
          </b>
        </p>
        <p>Constaría en principio de tres secciones:</p>
        <ul className={styles.ul}>
          <li>
            <strong>Acerca del proyecto:</strong> arquitectura, pequeña
            introducción
          </li>
          <li>
            Relación de las distintas <strong>tecnologías utilizadas</strong>
          </li>
          <li>
            <strong>Sobre nosotros</strong>: tarjeta con info básica y enlaces a
            RRSS de cada uno
          </li>
        </ul>
      </Layout>
    </>
  );
}
