import { useTranslation } from 'react-i18next';
import Layout from '../../components/layout/Layout';
import { ChangePasswordForm } from '../../components/forms/ChangePasswordForm';
// import styles from "./ChangePasswordPage.module.css";

export function ChangePasswordPage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('buttons.change_password')} page="changePassword">
        <ChangePasswordForm />
      </Layout>
    </>
  );
}
