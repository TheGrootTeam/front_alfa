import Layout from '../../components/layout/Layout';
import styles from './EditProfileApplicant.module.css'; // Asegúrate de que el archivo CSS correcto está siendo importado
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';

export function EditUserProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Para traducción
  const { email, dniCif, password } = location.state || {};
  
  // Use local state as a fallback if formData is not loaded
  const formData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);

  interface LocalFormData {
    dniCif?: string;
    email?: string;
    password?: string;
    name?: string;
    lastName?: string;
    phone?: string;
    ubication?: string;
    typeJob?: string;
    wantedRol?: string;
    mainSkills?: string;
    geographically_mobile?: boolean;
    disponibility?: boolean;
  }

  const [localFormData, setLocalFormData] = useState<LocalFormData>({});

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

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
    // Dispatches the action to update the profile
    dispatch(updateUserProfile(localFormData));
  };

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>DNI / CIF</label>
        <input type="text" name="dniCif" value={localFormData.dniCif || dniCif} readOnly />
        
        <label>Email</label>
        <input type="email" name="email" value={localFormData.email || email} readOnly />
        
        <label>Password</label>
        <input type="password" name="password" value={localFormData.password || password} readOnly />
        
        <label>{t('fields.name')}</label>
        <input type="text" name="name" value={localFormData.name || ''} onChange={handleChange} />
        
        <label>{t('fields.lastName')}</label>
        <input type="text" name="lastName" value={localFormData.lastName || ''} onChange={handleChange} />
        
        <label>{t('fields.phone')}</label>
        <input type="text" name="phone" value={localFormData.phone || ''} onChange={handleChange} />
        
        <label>{t('fields.location')}</label>
        <input type="text" name="ubication" value={localFormData.ubication || ''} onChange={handleChange} />
        
        <label>{t('fields.photo')}</label>
        <input type="file" name="photo" onChange={handleFileChange} />
        
        <label>{t('fields.cv')}</label>
        <input type="file" name="cv" onChange={handleFileChange} />
        
        <label>{t('fields.preferredWorkLocation')}</label>
        <input type="text" name="typeJob" value={localFormData.typeJob || ''} onChange={handleChange} />
        
        <label>{t('fields.wantedRole')}</label>
        <input type="text" name="wantedRol" value={localFormData.wantedRol || ''} onChange={handleChange} />
        
        <label>{t('fields.mainSkills')}</label>
        <input type="text" name="mainSkills" value={localFormData.mainSkills || ''} onChange={handleChange} />
        
        <label>
          {t('fields.willingToRelocate')}
          <input type="checkbox" name="geographically_mobile" checked={!!localFormData.geographically_mobile} onChange={handleChange} />
        </label>
        
        <label>
          {t('fields.availableImmediately')}
          <input type="checkbox" name="disponibility" checked={!!localFormData.disponibility} onChange={handleChange} />
        </label>

        {/* Show the error message if it exists */}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        <button type="submit" disabled={loading || !!error}>{t('buttons.saveAndFinish')}</button>
      </form>
    </Layout>
  );
}
