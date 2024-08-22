import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./Profile.module.css";

export function UserProfilePage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.userprofile')} page="userprofile"></Layout>
    </>
  );
}
