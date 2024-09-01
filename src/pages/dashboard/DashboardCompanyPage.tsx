import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./DashboardCompany.module.css";
import CompanyInfo from '../../components/dashboard/CompanyInfo';
import styles from './DashboardCompany.module.css';

export function DashBoardCompanyPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.dashboardCompany')} page="dashboard-company">
        <div className={styles.container}>
          <CompanyInfo />
          {/* <ListingsTemporal /> */}
        </div>
      </Layout>
    </>
  );
}
