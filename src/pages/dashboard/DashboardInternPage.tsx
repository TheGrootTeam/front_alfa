import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./DashboardIntern.module.css";

export function DashBoardInternPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.dashboard')} page="dashboard-intern"></Layout>
    </>
  );
}
