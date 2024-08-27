import ApplicantInfo from '../../components/dashboard/ApplicantInfo';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./DashboardIntern.module.css";

export function DashBoardInternPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.dashboardIntern')} page="dashboard-intern">
        <ApplicantInfo />
      </Layout>
    </>
  );
}
