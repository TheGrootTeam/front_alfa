import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './LostPasswordEmail.module.css';
import { LostPasswordForm } from '../../components/forms/LostPasswordForm';

export function LostPassword() {
  const { t } = useTranslation();
  return (
    <Layout
      title={t('titles.lost_password')}
      page="password"
      mainClassName={styles.lost_password_email}
    >
      <LostPasswordForm />
    </Layout>
  );
}
