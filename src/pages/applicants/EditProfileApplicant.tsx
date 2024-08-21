import Layout from '../../components/layout/Layout';
import styles from './EditProfileApplicant.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile, updateUserProfile } from '../../store/actions/profileActions';
import { RootState } from '../../store/store';

export function EditUserProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
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
    <Layout title="Edit Profile" page="edituserprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>DNI / CIF</label>
        <input type="text" name="dniCif" value={localFormData.dniCif || dniCif} readOnly />
        
        <label>Email</label>
        <input type="email" name="email" value={localFormData.email || email} readOnly />
        
        <label>Password</label>
        <input type="password" name="password" value={localFormData.password || password} readOnly />
        
        <label>Name</label>
        <input type="text" name="name" value={localFormData.name || ''} onChange={handleChange} />
        
        <label>Last Name</label>
        <input type="text" name="lastName" value={localFormData.lastName || ''} onChange={handleChange} />
        
        <label>Phone Number</label>
        <input type="text" name="phone" value={localFormData.phone || ''} onChange={handleChange} />
        
        <label>Location</label>
        <input type="text" name="ubication" value={localFormData.ubication || ''} onChange={handleChange} />
        
        <label>Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} />
        
        <label>CV / Resume</label>
        <input type="file" name="cv" onChange={handleFileChange} />
        
        <label>Preferred Work Location</label>
        <input type="text" name="typeJob" value={localFormData.typeJob || ''} onChange={handleChange} />
        
        <label>Wanted Role(s)</label>
        <input type="text" name="wantedRol" value={localFormData.wantedRol || ''} onChange={handleChange} />
        
        <label>Main Skills</label>
        <input type="text" name="mainSkills" value={localFormData.mainSkills || ''} onChange={handleChange} />
        
        <label>
          Willing to Relocate:
          <input type="checkbox" name="geographically_mobile" checked={!!localFormData.geographically_mobile} onChange={handleChange} />
        </label>
        
        <label>
          Available to Start Immediately:
          <input type="checkbox" name="disponibility" checked={!!localFormData.disponibility} onChange={handleChange} />
        </label>

        {/* Show the error message if it exists */}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        <button type="submit" disabled={loading || !!error}>Save & Finish</button>
      </form>
    </Layout>
  );
}
