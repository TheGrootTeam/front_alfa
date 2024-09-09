import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getSearchResultsAction } from '../../store/actions/searchActions';
import { setHasSearched } from '../../store/reducers/searchSlice';
import { useLocation } from 'react-router-dom';
import styles from './SearchForm.module.css';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../hooks/useDebounce';

const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // Debounce for 500ms
  const { error, loading } = useSelector((state: RootState) => state.search);

  const location = useLocation();

  const searchFormClass =
    location.pathname === '/'
      ? `${styles.searchForm} ${styles.homePage}`
      : styles.searchForm;

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setHasSearched(true));
      dispatch(getSearchResultsAction(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(setHasSearched(true));
      dispatch(getSearchResultsAction(searchTerm));
    }
  };

  // Handle the Enter key press to trigger the search immediately
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      {location.pathname === '/' && <h2>Tu portal de búsqueda de prácticas</h2>}
      <div className={searchFormClass}>
        <div>
          <input
            className={styles.input}
            type="text"
            placeholder={t('forms.search')}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className={styles.button}
            onClick={handleSearch}
            disabled={loading}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default SearchForm;
