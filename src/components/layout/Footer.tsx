import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ul className={styles.content}>
          <li className={styles.logo}>
            <h2>
              &copy; 2024 <strong>InternIT</strong>
            </h2>
          </li>
          <li>
            <Link to={`/about`}>
              <span className={`material-symbols-outlined ${styles.icon}`}>
                groups
              </span>
              <span className={styles.text}>{t('nav.about')}</span>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/orgs/TheGrootTeam/repositories"
              target="_blank"
            >
              <span className={`material-symbols-outlined ${styles.icon}`}>
                code
              </span>
              <span className={styles.text}>{t('nav.github_link')}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
