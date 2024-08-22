import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./LostPassword.module.css";

export function LostPassword() {
  const { t } = useTranslation();
  return <Layout title={t('titles.lost_password')} page="password"></Layout>;
}
