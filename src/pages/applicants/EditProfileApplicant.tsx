import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApplicantForm } from '../../components/forms/ApplicantForm';
import { getUi } from '../../store/selectors';

export function EditUserProfilePage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <ApplicantForm loading={loading} error={error} formMode="edit" />
    </Layout>
  );
}
