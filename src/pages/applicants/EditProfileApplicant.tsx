import Layout from '../../components/layout/Layout';
import styles from './EditProfileApplicant.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApplicantProfileData } from '../../utils/interfaces/IProfile';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { Button } from '../../components/common/Button';
import { getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';

export function EditUserProfilePage() {
  const { loading, error } = useSelector(getUi);
  const location = useLocation();
  const { t } = useTranslation();
  const { email, dniCif, password } = location.state || {};


  const [localFormData, setLocalFormData] = useState<ApplicantProfileData>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...localFormData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setLocalFormData(updatedData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    const updatedData = { ...localFormData, [name]: file };
    setLocalFormData(updatedData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText
          labelText="DNI / CIF"
          id="dniCif"
          name="dniCif"
          value={localFormData.dniCif || dniCif}
          readOnly
          onChange={handleChange}
        />

        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={localFormData.email || email}
          readOnly
          onChange={handleChange}
        />

        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={localFormData.password || password}
          readOnly
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.name')}
          id="name"
          name="name"
          value={localFormData.name || ''}
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.lastName')}
          id="lastName"
          name="lastName"
          value={localFormData.lastName || ''}
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={localFormData.phone || ''}
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.location')}
          id="ubication"
          name="ubication"
          value={localFormData.ubication || ''}
          onChange={handleChange}
        />

        <label>{t('fields.photo')}</label>
        <input type="file" name="photo" onChange={handleFileChange} />

        <label>{t('fields.cv')}</label>
        <input type="file" name="cv" onChange={handleFileChange} />

        <FormInputText
          labelText={t('fields.preferredWorkLocation')}
          id="typeJob"
          name="typeJob"
          value={localFormData.typeJob || ''}
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.wantedRole')}
          id="wantedRol"
          name="wantedRol"
          value={localFormData.wantedRol || ''}
          onChange={handleChange}
        />

        <FormInputText
          labelText={t('fields.mainSkills')}
          id="mainSkills"
          name="mainSkills"
          value={localFormData.mainSkills || ''}
          onChange={handleChange}
        />

        <FormCheckbox
          id="geographically_mobile"
          name="geographically_mobile"
          labelText={t('fields.willingToRelocate')}
          checked={!!localFormData.geographically_mobile}
          onChange={handleChange}
        />

        <FormCheckbox
          id="disponibility"
          name="disponibility"
          labelText={t('fields.availableImmediately')}
          checked={!!localFormData.disponibility}
          onChange={handleChange}
        />

        {error && <p className={styles.error}>Error: {error}</p>}

        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </Layout>
  );
}
