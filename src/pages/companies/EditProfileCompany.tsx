import Layout from '../../components/layout/Layout';
import styles from './EditProfileCompany.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormTextarea } from '../../components/formElements/formTextArea';
import { Button } from '../../components/common/Button';

export function EditCompanyProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { email, dniCif, password } = location.state || {};

  const formData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  
  const [localFormData, setLocalFormData] = useState({
    dniCif: dniCif || '',
    email: email || '',
    password: password || '',
    name: '',
    phone: '',
    sector: '',
    ubication: '',
    description: '',
  });

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (formData) {
      setLocalFormData((prevData) => ({
        ...prevData,
        ...formData,
      }));
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
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
    dispatch(updateUserProfile(localFormData));
  };

  return (
    <Layout title={t('titles.companyprofile_edit')} page="editcompanyprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText
          labelText="CIF"
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
          labelText={t('fields.phone')}
          id="phone"
          name="phone"
          value={localFormData.phone || ''}
          onChange={handleChange}
        />
        
        <FormInputText
          labelText={t('fields.industry')}
          id="sector"
          name="sector"
          value={localFormData.sector || ''}
          onChange={handleChange}
        />
        
        <FormInputText
          labelText={t('fields.location')}
          id="ubication"
          name="ubication"
          value={localFormData.ubication || ''}
          onChange={handleChange}
        />
        
        <FormTextarea
          labelText={t('forms.description')}
          placeholder="Describe your company's activity"
          id="description"
          name="description"
          value={localFormData.description || ''}
          onChange={handleChange}
        />
        
        <label>{t('fields.logo')}</label>
        <input type="file" name="logo" onChange={handleFileChange} />

        {error && <p className={styles.error}>Error: {error}</p>}
        
        <Button type="submit" disabled={loading || !!error}>
          {t('buttons.saveAndFinish')}
        </Button>
      </form>
    </Layout>
  );
}
