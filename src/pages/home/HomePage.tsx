import SearchForm from '../../components/common/SearchForm';
import { Listings } from '../../components/listings/Listings';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styles from './Home.module.css';

export function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <SearchForm />
        <Listings />
      </main>
      <Footer />
    </>
  );
}
