import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CompanyForm } from '../../components/forms/CompanyForm';
import { getUi } from '../../store/selectors';

export function EditCompanyProfilePage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  return (
    <Layout title={t('titles.companyprofile_edit')} page="editcompanyprofile">
      <CompanyForm loading={loading} error={error} formMode="edit" />
    </Layout>
  );
}
