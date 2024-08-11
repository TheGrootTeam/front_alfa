// src/pages/register/RegisterPage.tsx
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useState } from 'react';
import { registerUser } from '../../store/reducers/registerSlice';
import { RootState } from '../../store/store';
import styles from './Register.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import { Button } from '../../components/common/Button';
import Notification from '../../components/common/Notification';

export function RegisterPage() {
  const dispatch = useDispatch();
  const { loading, error }: { loading: boolean, error: { message: string } | null } = useSelector((state: RootState) => state.register) as { loading: boolean, error: { message: string } | null };
  
  const [formData, setFormData] = useState({
    dniCif: '',
    email: '',
    password: '',
    confirmPassword: '',
    isCompany: null,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { dniCif, email, password, confirmPassword, isCompany } = formData;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const resultAction = await dispatch(registerUser({ dniCif, email, password, isCompany: isCompany === 'true' }) as any);
      
      if (registerUser.fulfilled.match(resultAction)) {
        // Show the successful message
        setSuccessMessage('User registered successfully');
        
        // Clean the form fields
        setFormData({
          dniCif: '',
          email: '',
          password: '',
          confirmPassword: '',
          isCompany: null,
        });
        
        // Hide the successful message after 2 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'radio' ? event.target.value : event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  return (
    <Layout title="Register" page="register">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputText labelText="DNI/CIF" name="dniCif" value={dniCif} onChange={handleChange} required id="dniCif-input" />
        <FormInputText labelText="Email" name="email" type="email" value={email} onChange={handleChange} required id="email-input" />
        <FormInputText labelText="Password" name="password" type="password" value={password} onChange={handleChange} required id="password-input" />
        <FormInputText labelText="Confirm Password" name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} required id="confirmPassword-input" />
        <FormRadioButton
          className={styles.radioButton} 
          title="Select type"
          arrayOptions={[
            { id: 'company-radio', labelText: 'Company', name: 'isCompany', value: 'true', checked: isCompany === 'true', onChange: handleChange },
            { id: 'applicant-radio', labelText: 'Applicant', name: 'isCompany', value: 'false', checked: isCompany === 'false', onChange: handleChange }
          ]}
        />
        <Button type="submit" disabled={!dniCif || !email || !password || password !== confirmPassword || isCompany === null}>
          Register
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>Error: {error.message}</p>}
        {successMessage && <Notification message={successMessage} type="success" />}
      </form>
    </Layout>
  );
}
