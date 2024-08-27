import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./Profile.module.css";

interface UserProfilePageProps {
  userId: string;
}

export function CompanyProfilePage({ userId }: UserProfilePageProps) {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.companyprofile')} page="companyprofile"></Layout>
    </>
  );
}
