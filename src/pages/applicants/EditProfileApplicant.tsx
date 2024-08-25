import Layout from '../../components/layout/Layout';
import styles from './EditProfileApplicant.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { Button } from '../../components/common/Button';

export function EditUserProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { email, dniCif, password, isCompany } = location.state || {};

  const formData = useSelector((state: RootState) => state.profile.profileData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);

  const [localFormData, setLocalFormData] = useState({
    dniCif: dniCif || '',
    email: email || '',
    password: password || '',
    name: '',
    lastName: '',
    phone: '',
    ubication: '',
    typeJob: '',
    wantedRol: '',
    mainSkills: '',
    geographically_mobile: false,
    disponibility: false,
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
    dispatch(updateUserProfile(localFormData));
  };

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText
          labelText={isCompany ? t('forms.cif') : t('forms.nif')}
          id="dniCif"
          name="dniCif"
          value={localFormData.dniCif}
          readOnly
          onChange={handleChange}
        />
        
        <FormInputText
          labelText="Email"
          id="email"
          name="email"
          type="email"
          value={localFormData.email}
          readOnly
          onChange={handleChange}
        />
        
        <FormInputText
          labelText="Password"
          id="password"
          name="password"
          type="password"
          value={localFormData.password}
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
