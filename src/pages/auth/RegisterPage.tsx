import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { registerUser } from '../../store/reducers/registerSlice';
import { RootState } from '../../store/store';
import styles from './Register.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import { Button } from '../../components/common/Button';
import Notification from '../../components/common/Notification';
import { useTranslation } from 'react-i18next';

export function RegisterPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    loading,
    error,
  }: { loading: boolean; error: { message: string } | null } = useSelector(
    (state: RootState) => state.register
  ) as { loading: boolean; error: { message: string } | null };

  const [formData, setFormData] = useState({
    dniCif: '',
    email: '',
    password: '',
    confirmPassword: '',
    isCompany: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [dniCifError, setDniCifError] = useState<string | null>(null);

  const { dniCif, email, password, confirmPassword, isCompany } = formData;

  // Verify passwords every time they change
  useEffect(() => {
    if (!password || !confirmPassword)
      setPasswordError(t('errors.password_empty'));
    else if (password !== confirmPassword)
      setPasswordError(t('errors.password_different'));
    else if (!isPasswordStrong(password))
      setPasswordError(t('errors.password_rules'));
    else setPasswordError(null);
  }, [password, confirmPassword]);

  // Verify email every time you change
  useEffect(() => {
    if (email && !isValidEmail(email)) setEmailError(t('errors.email_invalid'));
    else setEmailError(null);
  }, [email]);

  // Verify the ID/CIF every time it changes
  useEffect(() => {
    if (dniCif) {
      if (isCompany === 'true' && !isValidCIF(dniCif))
        setDniCifError(t('errors.dnicif_format'));
      else if (isCompany === 'false' && !isValidNIF_NIE(dniCif))
        setDniCifError(t('errors.dnicif_invalid'));
      else setDniCifError(null);
    }
  }, [dniCif, isCompany]);

  const isPasswordStrong = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidCIF = (cif: string) => /^[A-H][0-9]{8}$/.test(cif);
  const isValidNIF_NIE = (nifNie: string) =>
    /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie) ||
    /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordError || emailError || dniCifError) return;

    try {
      const resultAction = await dispatch(
        registerUser({
          dniCif,
          email,
          password,
          isCompany: isCompany === 'true',
        }) as any
      );
      if (registerUser.fulfilled.match(resultAction)) {
        setSuccessMessage(t('forms.register_success'));
        setFormData({
          dniCif: '',
          email: '',
          password: '',
          confirmPassword: '',
          isCompany: null,
        });
        setPasswordError(null);
        setEmailError(null);
        setDniCifError(null);
        setTimeout(() => setSuccessMessage(null), 2000);
      }
    } catch (error) {
      console.error(t('errors.register_error'), error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        name === 'dniCif' ? (inputValue as string).toUpperCase() : inputValue,
    }));
  };

  return (
    <Layout title={t('titles.register')} page="register">
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <FormInputText
          labelText={
            isCompany === 'true'
              ? t('forms.cif')
              : isCompany === 'false'
                ? t('forms.nif')
                : t('forms.cif_nif')
          }
          name="dniCif"
          value={dniCif}
          onChange={handleChange}
          required
          id="dniCif-input"
        />
        {dniCifError && <p className={styles.error}>{dniCifError}</p>}
        <FormInputText
          labelText={t('forms.email')}
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
          id="email-input"
        />
        {emailError && <p className={styles.error}>{emailError}</p>}
        <FormInputText
          labelText={t('forms.password')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChange}
          required
          id="password-input"
        />
        <FormInputText
          labelText={t('forms.password_confirm')}
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={handleChange}
          required
          id="confirmPassword-input"
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          {t('forms.password_show')}
        </label>
        <Button
          type="submit"
          disabled={
            !dniCif ||
            !email ||
            !password ||
            password !== confirmPassword ||
            isCompany === null ||
            !!passwordError ||
            !!emailError ||
            !!dniCifError
          }
        >
          {t('forms.register_button')}
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>Error: {error.message}</p>}
        {successMessage && (
          <Notification message={successMessage} type="success" />
        )}
      </form>
    </Layout>
  );
}
