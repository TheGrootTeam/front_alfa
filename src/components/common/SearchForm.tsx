import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getSearchResultsAction } from '../../store/actions/searchActions';
import {
  setHasSearched,
  setSearchTerm,
} from '../../store/reducers/searchSlice';
import { useLocation } from 'react-router-dom';
import styles from './SearchForm.module.css';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../hooks/useDebounce';

const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTermState] = useState('');
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
      dispatch(setSearchTerm(debouncedSearchTerm));
      dispatch(
        getSearchResultsAction({
          searchTerm: debouncedSearchTerm,
          page: 1, // Set the initial page to 1
          limit: 10, // Set a default limit for results per page
        })
      );
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(setHasSearched(true));
      dispatch(setSearchTerm(searchTerm));
      dispatch(
        getSearchResultsAction({
          searchTerm,
          page: 1, // Reset page to 1 when doing a new search
          limit: 10, // Use default limit
        })
      );
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
