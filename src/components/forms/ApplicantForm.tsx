import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
import { IApplicantInfoWithPassword } from '../../utils/interfaces/IInfoApplicant';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormSelect } from '../formElements/formSelectTemp';
import { FormMultiSelect } from '../formElements/formMultiselect';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import {
  skills as rawSkills,
  rols as rawRoles,
} from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';

const formattedSkills = rawSkills.map((skill) => ({
  _id: skill._id,
  skill: skill.skill,
}));

const formattedRoles = rawRoles.map((role) => ({
  _id: role._id,
  rol: role.rol,
}));

interface ApplicantFormProps {
  loading: boolean;
  error: string | null;
}

export function ApplicantForm({ loading, error }: ApplicantFormProps) {
  const { t } = useTranslation();

  const [formApplicantData, setFormApplicantData] =
    useState<IApplicantInfoWithPassword>({
      dniCif: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      photo: '',
      cv: '',
      ubication: '',
      typeJob: '',
      internType: '',
      wantedRol: [],
      mainSkills: [],
      geographically_mobile: false,
      disponibility: false,
    });

  const [showPassword, setShowPassword] = useState(false);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // VALIDACIONES
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [dniCifError, setDniCifError] = useState<string | null>(null);

  const { dniCif, email, password, confirmPassword } = formApplicantData;

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
      if (!isValidNIF_NIE(dniCif)) setDniCifError(t('errors.dnicif_invalid'));
      else setDniCifError(null);
    }
  }, [dniCif, t]);

  const isPasswordStrong = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidNIF_NIE = (nifNie: string) =>
    /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie) ||
    /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(nifNie);

  const jobOptions = useFormSelectOptions('job'); // opciones para el selector typeJob
  const internOptions = useFormSelectOptions('internship'); // opciones para el selector internType

  // manejo de los campos tipo TEXTO
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de las CHECKBOX
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormApplicantData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // manejo de los SELECT simples
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de los MULTISELECT
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    const fieldMappings: { [key: string]: any[] } = {
      mainSkills: formattedSkills,
      rols: formattedRoles,
    };

    if (fieldMappings[name]) {
      const selectedObjects = fieldMappings[name].filter((item) =>
        selectedValues.includes(item._id)
      );
      setFormApplicantData((prevData) => ({
        ...prevData,
        [name]: selectedObjects,
      }));
    } else {
      setFormApplicantData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    }
  };

  // manejo de los FILE INPUT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    setFormApplicantData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError || emailError || dniCifError) return;

    // CODIGO ORIGINAL HANDLESUBMIT PARA EL REGISTER COMENTADO AL FINAL DE TODO

    // TODO: si el registro sale bien,
    // - Enviar datos del usuario
    // - Guardar token y la info necesaria donde haga falta
    // - Mostrar mensaje de éxito con un timeout de un par de segundos
    // - Redirigir el usuario a su dashboard /user

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
              labelText={t('forms.nif')}
              id="dniCif"
              name="dniCif"
              value={formApplicantData.dniCif || ''}
              onChange={handleTextChange}
            />
            {dniCifError && <Notification type="error" message={dniCifError} />}
          </li>
          <li>
            <FormInputText
              labelText={t('forms.email')}
              id="email"
              name="email"
              type="email"
              value={formApplicantData.email || ''}
              onChange={handleTextChange}
            />
            {emailError && <Notification type="error" message={emailError} />}
          </li>
          <li>
            <FormInputText
              labelText={t('forms.password')}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formApplicantData.password || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.password_confirm')}
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formApplicantData.confirmPassword || ''}
              onChange={handleTextChange}
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
              value={formApplicantData.name || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.lastName')}
              id="lastName"
              name="lastName"
              value={formApplicantData.lastName || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.phone')}
              id="phone"
              name="phone"
              value={formApplicantData.phone || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.location')}
              id="ubication"
              name="ubication"
              value={formApplicantData.ubication || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <label>{t('fields.photo')}</label>
            <input type="file" name="photo" onChange={handleFileChange} />
          </li>
          <li>
            <label>{t('fields.cv')}</label>
            <input type="file" name="cv" onChange={handleFileChange} />
          </li>
          <li>
            <FormSelect
              labelText={t('fields.preferredWorkLocation')}
              id="typeJob"
              name="typeJob"
              value={formApplicantData.typeJob || ''}
              onChange={handleSelectChange}
              options={jobOptions}
            />
          </li>
          <li>
            <FormSelect
              labelText={t('forms.preferredInternshipType')}
              id="internType"
              name="internType"
              value={formApplicantData.internType || ''}
              onChange={handleSelectChange}
              options={internOptions}
            />
          </li>
          <li>
            <FormMultiSelect
              labelText={t('fields.mainSkills')}
              id="mainSkills"
              name="mainSkills"
              value={formApplicantData.mainSkills.map((skill) => skill._id)}
              onChange={handleMultiSelectChange}
              optionLabel="skill"
              options={formattedSkills}
            />
          </li>
          <li>
            <FormMultiSelect
              labelText={t('fields.wantedRole')}
              id="wantedRols"
              name="wantedRols"
              value={formApplicantData.wantedRol.map((rol) => rol._id)}
              onChange={handleMultiSelectChange}
              optionLabel="rol"
              options={formattedRoles}
            />
          </li>
          <li>
            <FormCheckbox
              id="geographically_mobile"
              name="geographically_mobile"
              labelText={t('forms.willing_to_relocate')}
              checked={!!formApplicantData.geographically_mobile}
              onChange={handleCheckboxChange}
            />
          </li>
          <li>
            <FormCheckbox
              id="disponibility"
              name="disponibility"
              labelText={t('forms.available_immediately')}
              checked={!!formApplicantData.disponibility}
              onChange={handleCheckboxChange}
            />
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
