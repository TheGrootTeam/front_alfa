import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import styles from './Register.module.css';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import { ApplicantForm } from '../../components/forms/ApplicantForm';
import { CompanyForm } from '../../components/forms/CompanyForm';
import { getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function RegisterPage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  // State to manage radio button selection, default to null (no selection)
  const [isCompany, setIsCompany] = useState<string | null>(null);

  // Handler for radio button change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompany(event.target.value);
  };

  return (
    <Layout title={t('titles.register')} page="register">
      <>
        <form className={styles.form}>
          <FormRadioButton
            className={styles.radioButton}
            title={t('forms.select_usertype')}
            arrayOptions={[
              {
                id: 'company-radio',
                labelText: t('forms.company'),
                name: 'isCompany',
                value: 'true',
                checked: isCompany === 'true',
                onChange: handleChange,
              },
              {
                id: 'applicant-radio',
                labelText: t('forms.applicant'),
                name: 'isCompany',
                value: 'false',
                checked: isCompany === 'false',
                onChange: handleChange,
              },
            ]}
          />
        </form>

        {/* Conditionally render the form based on the radio button selection */}
        {isCompany === 'true' && (
          <div id="companyForm">
            <CompanyForm loading={loading} error={error} />
          </div>
        )}
        {isCompany === 'false' && (
          <div id="applicantForm">
            <ApplicantForm loading={loading} error={error} />
          </div>
        )}
      </>
    </Layout>
  );
}
