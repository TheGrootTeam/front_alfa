import Layout from "../../components/layout/Layout";
import SearchForm from "../../components/common/SearchForm";
import BannerList from "../../components/home/BannerList";

export function HomePage() {
  return (
    <Layout page="home">
      <SearchForm />
      <BannerList />
    </Layout>
  );
}
