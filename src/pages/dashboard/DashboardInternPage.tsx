import ApplicantInfo from '../../components/dashboard/ApplicantInfo';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Listings } from '../../components/listings/Listings';
import styles from './DashboardIntern.module.css';
import SearchForm from '../../components/common/SearchForm';
import { SearchResults } from '../../components/common/SearchResults';

export function DashBoardInternPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.dashboardIntern')} page="dashboard-intern">
        <div className={styles.container}>
          <ApplicantInfo />
          <div>
            <SearchForm />
            <SearchResults />
            <Listings />
          </div>
        </div>
      </Layout>
    </>
  );
}
