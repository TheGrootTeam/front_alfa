import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormTextarea } from '../formElements/formTextareaProps';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import { sectors } from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API

interface ICompanyInfoWithPassword {
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: Sector;
  ubication: string;
  description: string;
  logo: string;
  password: string;
  confirmPassword: string;
}

interface Sector {
  _id: string;
  sector: string;
}

interface CompanyFormProps {
  loading: boolean;
  error: string | null;
}

export function CompanyForm({ loading, error }: CompanyFormProps) {
  const { t } = useTranslation();

  const [formCompanyData, setCompanyFormData] =
    useState<ICompanyInfoWithPassword>({
      dniCif: '',
      name: '',
      email: '',
      phone: '',
      sector: { _id: '', sector: '' },
      ubication: '',
      description: '',
      logo: '',
      password: '',
      confirmPassword: '',
    });

  const [showPassword, setShowPassword] = useState(false);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // VALIDACIONES
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [dniCifError, setDniCifError] = useState<string | null>(null);

  const { dniCif, email, password, confirmPassword } = formCompanyData;

  useEffect(() => {
    if (!password || !confirmPassword)
      setPasswordError(t('errors.password_empty'));
    else if (password !== confirmPassword)
      setPasswordError(t('errors.password_different'));
    else if (!isPasswordStrong(password))
      setPasswordError(t('errors.password_rules'));
    else setPasswordError(null);
  }, [password, confirmPassword, t]);

  useEffect(() => {
    if (email && !isValidEmail(email)) setEmailError(t('errors.email_invalid'));
    else setEmailError(null);
  }, [email, t]);

  useEffect(() => {
    if (dniCif) {
      if (!isValidCIF(dniCif)) setDniCifError(t('errors.dnicif_format'));
      else setDniCifError(null);
    }
  }, [dniCif, t]);

  const isPasswordStrong = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidCIF = (cif: string) => /^[A-H][0-9]{8}$/.test(cif);

  // manejo de los campos tipo TEXTO
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de los campos tipo TEXTAREA
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo del campo SELECT para SECTOR
  const handleSectorSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'sector') {
      const selectedSector = sectors.find((sector) => sector._id === value) || {
        _id: '',
        sector: '',
      };

      setCompanyFormData((prevData) => ({
        ...prevData,
        [name]: selectedSector,
      }));
    } else {
      setCompanyFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // manejo de los FILE INPUT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    setCompanyFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError || emailError || dniCifError) return;

    // CODIGO ORIGINAL HANDLESUBMIT PARA EL REGISTER COMENTADO AL FINAL DE TODO

    // TODO: si el registro sale bien,
    // - Enviar datos del usuario
    // - Guardar token y la info necesaria donde haga falta
    // - Mostrar mensaje de éxito con un timeout de un par de segundos
    // - Redirigir el usuario a su dashboard /company

    // TODO: si el registro sale mal,
    // - Recoger y gestionar el error
    // - Mostrar el mensaje correspondiente con el componente Notification
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.cif')}
              id="dniCif"
              name="dniCif"
              value={formCompanyData.dniCif || ''}
              onChange={handleInputChange}
            />
            {dniCifError && <Notification type="error" message={dniCifError} />}
          </li>
          <li>
            <FormInputText
              labelText={t('forms.email')}
              id="email"
              name="email"
              type="email"
              value={formCompanyData.email || ''}
              onChange={handleInputChange}
            />
            {emailError && <Notification type="error" message={emailError} />}
          </li>
          <li>
            <FormInputText
              labelText={t('forms.password')}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formCompanyData.password || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.password_confirm')}
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formCompanyData.confirmPassword || ''}
              onChange={handleInputChange}
            />
            {passwordError && (
              <Notification type="error" message={passwordError} />
            )}
          </li>
          <li>
            <FormCheckbox
              id="showPassword-checkbox"
              name="showPassword"
              labelText={t('forms.password_show')}
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.name')}
              id="name"
              name="name"
              value={formCompanyData.name || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.phone')}
              id="phone"
              name="phone"
              value={formCompanyData.phone || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="sector">{t('fields.sector')}</label>
            <select
              id="sector"
              name="sector"
              value={formCompanyData.sector._id}
              onChange={handleSectorSelectChange}
            >
              <option value="">{t('forms.select_sector')}</option>
              {sectors.map((sector) => (
                <option key={sector._id} value={sector._id}>
                  {sector.sector}
                </option>
              ))}
            </select>
          </li>
          <li>
            <FormInputText
              labelText={t('fields.location')}
              id="ubication"
              name="ubication"
              value={formCompanyData.ubication || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormTextarea
              labelText={t('fields.description')}
              id="description"
              name="description"
              value={formCompanyData.description || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <label>{t('fields.logo')}</label>
            <input type="file" name="logo" onChange={handleFileChange} />
          </li>
          <li>
            <Button type="submit" disabled={loading || !!error}>
              {t('buttons.saveAndFinish')}
            </Button>
          </li>
        </ul>
        {error && <Notification type="error" message={error} />}
      </form>
    </>
  );
}

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   if (passwordError || emailError || dniCifError) return;

//   try {
//     const resultAction = await dispatch(
//       registerUser({
//         dniCif,
//         email,
//         password,
//         isCompany: isCompany === 'true',
//       }) as any
//     );

//     if (registerUser.fulfilled.match(resultAction)) {
//       // const { token, isCompany: isCompanyFromResponse } = resultAction.payload;

//       // Guardar el token en localStorage y configurar la autorización para futuras solicitudes
//       // localStorage.setItem('token', token);
//       // localStorage.setItem('isCompany', isCompanyFromResponse.toString());
//       // setAuthorizationHeader(token);

//       setSuccessMessage(t('forms.register_success'));
//       setFormData({
//           dniCif: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           isCompany: null,
//       });
//       setTimeout(() => setSuccessMessage(null), 2000);

//       // Asegurarse de que el valor de isCompany es el esperado
//       // console.log("Valor de isCompany:", isCompanyFromResponse);

//       // Corregir la lógica de redirección

//       const isCompany = true //USESELECTOR PARA SABER SI IS COMPANY
//       if (isCompany) {
//           navigate('/edit/company');
//       } else {
//           navigate('/edit/user');
//       }
//     } else if (registerUser.rejected.match(resultAction)) {
//       const errorPayload = resultAction.payload;
//       if (errorPayload?.message === 'User already exists') {
//         setErrorMessage(
//           <>
//             {t('errors.user_exists')}.{' '}
//             <Link to="/login">{t('forms.login_link')}</Link>
//           </>
//         );
//       } else {
//         setErrorMessage(t('errors.register_error'));
//       }
//     }
//   } catch (error) {
//     console.error(t('errors.register_error'), error);
//     setErrorMessage(t('errors.register_error'));
//   }
// };
