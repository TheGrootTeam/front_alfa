import Layout from '../../components/layout/Layout';
import styles from './EditProfileCompany.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';

export function EditCompanyProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { email, dniCif, password } = location.state || {}; 

  const formData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  
  interface FormData {
    dniCif: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    sector: string;
    ubication: string;
    description: string;
  }
  
  const [localFormData, setLocalFormData] = useState<FormData>({
    dniCif: '',
    email: '',
    password: '',
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
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };
    setLocalFormData(updatedData);
    dispatch(updateUserProfile(updatedData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    const updatedData = { ...localFormData, [name]: file };
    setLocalFormData(updatedData);
    dispatch(updateUserProfile(updatedData));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para manejar la actualización del perfil
  };

  return (
    <Layout title={t('titles.companyprofile_edit')} page="editcompanyprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>{t('fields.cif')}</label>
        <input type="text" name="dniCif" value={localFormData.dniCif || dniCif} readOnly />
        
        <label>{t('fields.email')}</label>
        <input type="email" name="email" value={localFormData.email || email} readOnly />
        
        <label>{t('fields.password')}</label>
        <input type="password" name="password" value={localFormData.password || password} readOnly />
      
        <label>{t('fields.name')}</label>
        <input type="text" name="name" value={localFormData.name || ''} onChange={handleChange} />
        
        <label>{t('fields.phone')}</label>
        <input type="text" name="phone" value={localFormData.phone || ''} onChange={handleChange} />
        
        <label>{t('fields.industry')}</label>
        <input type="text" name="sector" value={localFormData.sector || ''} onChange={handleChange} />
        
        <label>{t('fields.location')}</label>
        <input type="text" name="ubication" value={localFormData.ubication || ''} onChange={handleChange} />
        
        <label>{t('fields.description')}</label>
        <input type="text" name="description" value={localFormData.description || ''} onChange={handleChange} />
        
        <label>{t('fields.logo')}</label>
        <input type="file" name="logo" onChange={handleFileChange} />

        {/* Show the error message if it exists */}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        <button type="submit" disabled={loading || !!error}>{t('buttons.saveAndFinish')}</button>
      </form>
    </Layout>
  );
}
