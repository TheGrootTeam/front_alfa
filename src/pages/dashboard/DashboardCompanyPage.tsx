import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./DashboardCompany.module.css";

export function DashBoardCompanyPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.dashboard')} page="dashboard-company"></Layout>
    </>
  );
}
