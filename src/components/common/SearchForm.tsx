import styles from './SearchForm.module.css';
import { useTranslation } from 'react-i18next';

const SearchForm = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.searchForm}>
        <input
          className={styles.input}
          type="text"
          placeholder={t('forms.search')}
        />
        <button className={styles.button}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default SearchForm;
