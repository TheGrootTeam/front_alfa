import Layout from '../../components/layout/Layout';
import SearchForm from '../../components/common/SearchForm';
import BannerList from '../../components/home/BannerList';
import { Listings } from '../../components/listings/Listings';
// import styles from "./Home.module.css";

export function HomePage() {
  return (
    <Layout page="home">
      <SearchForm />
      <Listings />
      <BannerList />
    </Layout>
  );
}
