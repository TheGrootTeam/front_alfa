import Layout from '../../components/layout/Layout';
import styles from './EditProfileCompany.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';

export function EditCompanyProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
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
    <Layout title="Edit Profile" page="editcompanyprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>CIF</label>
        <input type="text" name="dniCif" value={localFormData.dniCif || dniCif} readOnly />
        
        <label>Email</label>
        <input type="email" name="email" value={localFormData.email || email} readOnly />
        
        <label>Password</label>
        <input type="password" name="password" value={localFormData.password || password} readOnly />
      
        <label>Name</label>
        <input type="text" name="name" value={localFormData.name || ''} onChange={handleChange} />
        
        <label>Phone Number</label>
        <input type="text" name="phone" value={localFormData.phone || ''} onChange={handleChange} />
        
        <label>Industry</label>
        <input type="text" name="sector" value={localFormData.sector || ''} onChange={handleChange} />
        
        <label>Location</label>
        <input type="text" name="ubication" value={localFormData.ubication || ''} onChange={handleChange} />
        
        <label>Description</label>
        <input type="text" name="description" value={localFormData.description || ''} onChange={handleChange} />
        
        <label>Logo</label>
        <input type="file" name="logo" onChange={handleFileChange} />

        {/* Show the error message if it exists */}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        <button type="submit" disabled={loading || !!error}>Save & Finish</button>
      </form>
    </Layout>
  );
}
