import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ul className={styles.content}>
          <li>
            &copy; 2024 <strong>InternIT</strong>
          </li>
          <li>
            <Link to={`/about`}>{t('nav.about')}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
