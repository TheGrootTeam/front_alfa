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
  const {
    searchTerm: reduxSearchTerm,
    error,
    loading,
  } = useSelector((state: RootState) => state.search);
  const [searchTerm, setSearchTermState] = useState(reduxSearchTerm || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const location = useLocation();

  const searchFormClass =
    location.pathname === '/'
      ? `${styles.searchForm} ${styles.homePage}`
      : styles.searchForm;

  // Sync local searchTerm with Redux searchTerm
  useEffect(() => {
    setSearchTermState(reduxSearchTerm);
  }, [reduxSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Trigger search only if the search term is not empty
      dispatch(setHasSearched(true));
      dispatch(setSearchTerm(debouncedSearchTerm));
      dispatch(
        getSearchResultsAction({
          searchTerm: debouncedSearchTerm,
          page: 1,
          limit: 10,
        })
      );
    } else {
      // Clear results if search term is empty
      dispatch(setSearchTerm(''));
      dispatch(setHasSearched(false)); // Optionally set this to false if no search has been performed
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
      {location.pathname === '/' && <h2>{t('titles.home_title')}</h2>}
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
