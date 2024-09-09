import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './SearchResults.module.css';
import { useTranslation } from 'react-i18next';

export const SearchResults = () => {
  const { t } = useTranslation();
  const { results, error, hasSearched, searchTerm } = useSelector(
    (state: RootState) => state.search
  );

  // Only render content if a search has been performed
  if (!hasSearched) {
    return null; // Render nothing if no search has been performed
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.results}>
      {results.length > 0 ? (
        <>
          <h2 className={styles.title}>
            {t('titles.search_results')} "{searchTerm}"
          </h2>{' '}
          {results.map((result) => (
            <div key={result._id} className={styles.result}>
              <h3>{result.position}</h3>
              <p>{result.description}</p>
            </div>
          ))}
        </>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};
