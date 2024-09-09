import SearchForm from '../../components/common/SearchForm';
import { Listings } from '../../components/listings/Listings';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './Home.module.css';
import { SearchResults } from '../../components/common/SearchResults';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <SearchForm />
        <SearchResults />
        <h2 className={styles.latest}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            new_releases
          </span>
          {t('titles.latest_offers')}
        </h2>
        <Listings />
      </main>
      <Footer />
    </>
  );
}
