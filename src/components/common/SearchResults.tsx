import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import styles from './SearchResults.module.css';
import { useTranslation } from 'react-i18next';
import { getSearchResultsAction } from '../../store/actions/searchActions';
import Pagination from './Pagination';
import { formatDate } from '../../utils/utilsDates';
import { Loader } from './Loader';
import Notification from './Notification';
import { useLocation } from 'react-router-dom';

export const SearchResults = () => {
  const {
    results,
    searchTerm,
    currentPage,
    totalPages,
    totalResults,
    limit,
    hasSearched,
  } = useSelector((state: RootState) => state.search);
  const { loading, error } = useSelector(getUi);
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const containerClass =
    location.pathname === '/'
      ? `${styles.listings} ${styles.homePage}`
      : styles.listings;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(getSearchResultsAction({ searchTerm, page: newPage, limit }));
    }
  };

  if (!hasSearched) {
    return null; // Render nothing if no search has been performed
  }

  if (error) {
    const resetError = () => {
      dispatch(uiSlice.actions.resetError());
    };

    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return (
    <div className={`${styles.results} ${containerClass}`}>
      {loading && <Loader />}
      {results.length > 0 ? (
        <>
          <h2 className={styles.title}>
            <span>
              <span className={`material-symbols-outlined ${styles.icon}`}>
                format_list_bulleted
              </span>

              {t('titles.search_results')}
              <em>"{searchTerm}"</em>
            </span>
            <span>
              ({totalResults} {t('titles.found_results')})
            </span>
          </h2>

          {results.map((result) => (
            <div key={result._id} className={styles.result}>
              <div className={styles.resultHeader}>
                <Link to={`/offers/${result._id}`}>
                  <h3>{result.position}</h3>
                </Link>
                <span className={styles.date}>
                  {formatDate(result.publicationDate)}
                </span>
              </div>
              <div className={styles.resultDesc}>{result.description}</div>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div>
          <div className={styles.noResults}>
            {t('titles.no_results_for')} <span>"{searchTerm}"</span>
          </div>
        </div>
      )}
    </div>
  );
};
