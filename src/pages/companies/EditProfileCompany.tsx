import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./EditProfile.module.css";

export function EditCompanyProfilePage() {
  const { t } = useTranslation();
  return (
    <>
      <Layout
        title={t('titles.companyprofile_edit')}
        page="editcompanyprofile"
      ></Layout>
    </>
  );
}
