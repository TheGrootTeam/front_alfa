import { LostPasswordEmailForm } from '../../components/forms/LostPasswordEmailForm';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './LostPasswordEmail.module.css';

export function LostPasswordEmail() {
  const { t } = useTranslation();
  return (
    <Layout
      title={t('titles.lost_password')}
      page="password"
      mainClassName={styles.lost_password_email}
    >
      <LostPasswordEmailForm />
    </Layout>
  );
}
