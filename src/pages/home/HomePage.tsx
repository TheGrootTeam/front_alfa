import Layout from "../../components/layout/Layout";
import SearchForm from "../../components/common/SearchForm";
import BannerList from "../../components/home/BannerList";
// import styles from "./Home.module.css";

export function HomePage() {
  return (
    <Layout page="home">
      <SearchForm />
      <BannerList />
    </Layout>
  );
}
