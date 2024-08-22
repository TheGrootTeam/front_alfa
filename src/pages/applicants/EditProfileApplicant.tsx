import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./EditProfile.module.css";

export function EditUserProfilePage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout
        title={t('titles.userprofile_edit')}
        page="edituserprofile"
      ></Layout>
    </>
  );
}
