import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./EditOffer.module.css";

export function EditOffer() {
  const { t } = useTranslation();
  return (
    <>
      <Layout title={t('titles.edit_offer')} page="editoffer"></Layout>
    </>
  );
}
