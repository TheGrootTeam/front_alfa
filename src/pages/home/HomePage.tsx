import SearchForm from '../../components/common/SearchForm';
import { Listings } from '../../components/listings/Listings';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './Home.module.css';
import { SearchResults } from '../../components/common/SearchResults';

export function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <SearchForm />
        <SearchResults />
        <Listings />
      </main>
      <Footer />
    </>
  );
}
