import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
// import { IRegisterCompanyForm } from '../../utils/interfaces/IInfoCompany';
import { IRegisterCompanyForm } from '../../utils/interfaces/IAuth';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormTextarea } from '../formElements/formTextareaProps';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import { sectors } from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API
import { createCompanyUser } from '../../utils/services/registerService';
// import { updateCompanyUser } from '../../utils/services/editService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { authLogin } from '../../store/actions/authActions';

export function RegisterCompanyForm() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(getUi);

  const [formCompanyData, setCompanyFormData] = useState<IRegisterCompanyForm>({
    dniCif: '',
    name: '',
    email: '',
    phone: '',
    sector: '',
    ubication: '',
    description: '',
    logo: '',
    password: '',
    confirmPassword: '',
    isCompany: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  // Validacion formulario completo al enviar (campos requeridos)
  const validateForm = (
    formCompanyData: IRegisterCompanyForm,
    t: (key: string) => string
  ): { isValid: boolean; errorMessage: string } => {
    setFormError(null);

    const requiredFields = {
      dniCif: t('forms.cif'),
      name: t('fields.name'),
      email: t('forms.email'),
      phone: t('fields.phone'),
      ubication: t('fields.location'),
      description: t('fields.description'),
      logo: t('fields.logo'),
      password: t('forms.password'),
      confirmPassword: t('forms.password_confirm'),
    };

    let isValid = true;
    let errorMessage = '';

    for (const [field, label] of Object.entries(requiredFields)) {
      const value = formCompanyData[field as keyof IRegisterCompanyForm];

      // añadimos esto para que no tenga en cuenta Sector, ya que es un objeto
      if (typeof value === 'object' && value !== null) {
        continue;
      }
      // ahora ya podemos validar todos los campos tipo string
      if (typeof value !== 'string' || value.trim().length === 0) {
        isValid = false;
        errorMessage = `${label} ${t('errors.required_field_error')}`;
        break;
      }
    }

    // y luego comprobamos el campo "Sector" aparte
    const sector = formCompanyData.sector;
    if (!sector || sector.trim().length === 0) {
      isValid = false;
      errorMessage = `${t('fields.sector')} ${t('errors.required_field_error')}`;
    }

    return { isValid, errorMessage };
  };

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

    setCompanyFormData((prevData: IRegisterCompanyForm) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de los FILE INPUT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : { name: null };
    setCompanyFormData((prevData) => ({
      ...prevData,
      [name]: `${file.name}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // si hay errores de formato o faltan campos requeridos no se envía
    if (passwordError || emailError || dniCifError) return;
    const { isValid, errorMessage } = validateForm(formCompanyData, t);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // si todo ok procedemos
    try {
      let result;
      console.log(formCompanyData);

      result = await createCompanyUser(formCompanyData, t);
      console.log('Company registered successfully:', result);

      setSuccessMessage(t('notifications.register_success'));
      setTimeout(() => {
        setSuccessMessage(null);
        dispatch(authLogin({ dniCif, password, rememberMe: true }));
        // navigate('/company');
      }, 2000);

      // Si estamos en EDIT
      // } else if (formMode === 'edit') {
      //   // Handle editing
      //   result = await updateCompanyUser(formCompanyData, t);
      //   console.log('Company information updated successfully:', result);

      //   setSuccessMessage(t('notifications.edit_success'));
      //   setTimeout(() => {
      //     setSuccessMessage(null);
      //     dispatch(authLogin({ dniCif, password, rememberMe: true }));
      //     // navigate('/company/profile');
      //   }, 2000);
      // }
    } catch (error) {
      console.error(t('errors.processing_form_error'), error);
      setFormError(t('errors.generic_form_error'));
    }
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
              value={formCompanyData.sector}
              onChange={handleSectorSelectChange}
            >
              <option key="default" value="">
                ---
              </option>
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
        {formError && <Notification type="error" message={formError} />}
        {successMessage && (
          <Notification message={successMessage} type="success" />
        )}
      </form>
    </>
  );
}
