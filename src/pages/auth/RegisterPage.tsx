import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import { registerUser, resetRegisterState } from '../../store/reducers/registerSlice';
import { RootState } from '../../store/store';
import styles from './Register.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import { Button } from '../../components/common/Button';
import Notification from '../../components/common/Notification';
import { useNavigate, Link } from 'react-router-dom';

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error }: { loading: boolean, error: string | null | { message: string } } = useSelector(
    (state: RootState) => state.register
  );

  const [formData, setFormData] = useState({ dniCif: '', email: '', password: '', confirmPassword: '', isCompany: null });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [dniCifError, setDniCifError] = useState<string | null>(null);

  const { dniCif, email, password, confirmPassword, isCompany } = formData;

  useEffect(() => {
    return () => {
      dispatch(resetRegisterState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!password || !confirmPassword) setPasswordError('Los campos de contraseña no pueden estar vacíos');
    else if (password !== confirmPassword) setPasswordError('Las contraseñas no coinciden');
    else if (!isPasswordStrong(password)) setPasswordError('La contraseña debe tener al menos 8 caracteres, incluir un número, una letra mayúscula y un carácter especial');
    else setPasswordError(null);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (email && !isValidEmail(email)) setEmailError('El correo electrónico no es válido');
    else setEmailError(null);
  }, [email]);

  useEffect(() => {
    if (dniCif) {
      if (isCompany === 'true' && !isValidCIF(dniCif)) setDniCifError('El CIF debe empezar con A, B, C, D, E, F, G, H y seguido de 8 dígitos');
      else if (isCompany === 'false' && !isValidNIF_NIE(dniCif)) setDniCifError('El NIF/NIE no es válido');
      else setDniCifError(null);
    }
  }, [dniCif, isCompany]);

  const isPasswordStrong = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidCIF = (cif: string) => /^[A-H][0-9]{8}$/.test(cif);
  const isValidNIF_NIE = (nifNie: string) => /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie) || /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordError || emailError || dniCifError) return;

    try {
      const resultAction = await dispatch(registerUser({ dniCif, email, password, isCompany: isCompany === 'true' }) as any);
      if (registerUser.fulfilled.match(resultAction)) {
        setSuccessMessage('Usuario registrado exitosamente');
        setFormData({ dniCif: '', email: '', password: '', confirmPassword: '', isCompany: null });
        setPasswordError(null);
        setEmailError(null);
        setDniCifError(null);
        setTimeout(() => setSuccessMessage(null), 2000);
      
        // Redirect the user according to the type after a successful record
        const password = formData.password;
        if (isCompany === 'true') {
          navigate('/company/edit', { state: { email, dniCif, password } });
        } else {
          navigate('/user/edit', { state: { email, dniCif, password } });
        }
      } 
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((currentData) => ({
      ...currentData,
      [name]: name === 'dniCif' ? (inputValue as string).toUpperCase() : inputValue, 
    }));
  };

  return (
    <Layout title="Register" page="register">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormRadioButton
          className={styles.radioButton}
          title="Select type"
          arrayOptions={[
            { id: 'company-radio', labelText: 'Company', name: 'isCompany', value: 'true', checked: isCompany === 'true', onChange: handleChange },
            { id: 'applicant-radio', labelText: 'Applicant', name: 'isCompany', value: 'false', checked: isCompany === 'false', onChange: handleChange },
          ]}
        />
        <FormInputText labelText={isCompany === 'true' ? 'CIF' : isCompany === 'false' ? 'NIF/NIE' : 'CIF o NIF/NIE'} name="dniCif" value={dniCif} onChange={handleChange} required id="dniCif-input" />
        {dniCifError && <p className={styles.error}>{dniCifError}</p>}
        <FormInputText labelText="Email" name="email" type="email" value={email} onChange={handleChange} required id="email-input" />
        {emailError && <p className={styles.error}>{emailError}</p>}
        <FormInputText labelText="Password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange} required id="password-input" />
        <FormInputText labelText="Confirm Password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleChange} required id="confirmPassword-input" />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <label>
          <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} />
          Mostrar contraseñas
        </label>
        <Button type="submit" disabled={!dniCif || !email || !password || password !== confirmPassword || isCompany === null || !!passwordError || !!emailError || !!dniCifError}>
          Register
        </Button>
        {loading && <p>Loading...</p>}
        {error && (
          <div className={styles.error}>
            <p>Error: {typeof error === 'string' ? error : error.message}</p>
            <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        )}
        {successMessage && <Notification message={successMessage} type="success" />}
      </form>
    </Layout>
  );
}
