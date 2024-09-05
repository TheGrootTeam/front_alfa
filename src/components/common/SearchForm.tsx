import styles from './SearchForm.module.css';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SearchForm = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const searchFormClass =
    location.pathname === '/'
      ? `${styles.searchForm} ${styles.homePage}`
      : styles.searchForm;

  return (
    <div className={styles.container}>
      {location.pathname === '/' && <h2>Tu portal de búsqueda de prácticas</h2>}
      <div className={searchFormClass}>
        <div>
          <input
            className={styles.input}
            type="text"
            placeholder={t('forms.search')}
          />
          <button className={styles.button}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
