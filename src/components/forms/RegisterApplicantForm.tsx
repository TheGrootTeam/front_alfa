import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import { useTranslation } from 'react-i18next';
// import { IRegisterApplicantForm } from '../../utils/interfaces/IInfoApplicant';
import { IRegisterApplicantForm } from '../../utils/interfaces/IAuth';
import { FormInputText } from '../formElements/formInputText';
import { FormCheckbox } from '../formElements/formCheckbox';
import { FormSelect } from '../formElements/formSelect';
import { FormMultiSelect } from '../formElements/formMultiselect';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import {
  skills as rawSkills,
  rols as rawRoles,
} from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';
import { createApplicantUser } from '../../utils/services/registerService';
// import { updateApplicantUser } from '../../utils/services/editService';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { authLogin } from '../../store/actions/authActions';
import FormField from '../formElements/formFile';

const formattedSkills = rawSkills.map((skill) => ({
  _id: skill._id,
  skill: skill.skill,
}));

const formattedRoles = rawRoles.map((role) => ({
  _id: role._id,
  rol: role.rol,
}));

export function RegisterApplicantForm() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(getUi);

  const jobOptions = useFormSelectOptions('job'); // opciones para el selector typeJob
  const internOptions = useFormSelectOptions('internship'); // opciones para el selector internType

  const [formApplicantData, setFormApplicantData] =
    useState<IRegisterApplicantForm>({
      dniCif: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      photo: {},
      cv: {},
      ubication: '',
      typeJob: jobOptions.length > 0 ? jobOptions[0] : '',
      internType: internOptions.length > 0 ? internOptions[0] : '',
      wantedRol: [],
      mainSkills: [],
      geographically_mobile: false,
      disponibility: false,
      isCompany: false,
    });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

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

  // Validacion formulario completo al enviar (campos requeridos)
  const validateForm = (
    formApplicantData: IRegisterApplicantForm,
    t: (key: string) => string
  ): { isValid: boolean; errorMessage: string } => {
    setFormError(null);

    const requiredFields = {
      dniCif: t('forms.nif'),
      name: t('forms.name'),
      lastName: t('forms.lastName'),
      email: t('forms.email'),
      password: t('forms.password'),
      confirmPassword: t('forms.password_confirm'),
      phone: t('forms.phone'),
      photo: t('forms.photo'),
      cv: t('forms.cv'),
      ubication: t('forms.location'),
      typeJob: t('forms.preferredWorkLocation'),
      internType: t('forms.preferredInternshipType'),
      wantedRol: t('forms.wantedRole'),
      mainSkills: t('forms.mainSkills'),
    };

    let isValid = true;
    let errorMessage = '';

    for (const [field, label] of Object.entries(requiredFields)) {
      if (
        !formApplicantData[field as keyof IRegisterApplicantForm] ||
        (formApplicantData[field as keyof IRegisterApplicantForm] as string)
          .length === 0
      ) {
        isValid = false;
        errorMessage = `${label} ${t('errors.required_field_error')}`;
        break;
      }
    }

    return { isValid, errorMessage };
  };

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
      .map((option) => option.value); // Collect selected IDs

    setFormApplicantData((prevData) => ({
      ...prevData,
      [name]: selectedValues, // Update the selected field (mainSkills or wantedRol) with IDs
    }));
  };

  // Envio de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const photo =
      photoInputRef?.current?.files && photoInputRef.current.files.length > 0
        ? photoInputRef.current.files[0]
        : 'applicant.photo';
    const cv =
      cvInputRef?.current?.files && cvInputRef.current.files.length > 0
        ? cvInputRef.current.files[0]
        : 'applicant.cv;';

    // si hay errores de formato o faltan campos requeridos no se envía
    if (passwordError || emailError || dniCifError) return;
    const { isValid, errorMessage } = validateForm(formApplicantData, t);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // si todo ok procedemos
    try {
      let result;
      formApplicantData.cv = cv;
      formApplicantData.photo = photo;
      console.log(formApplicantData)
      result = await createApplicantUser(formApplicantData, t);
      console.log('User registered successfully:', result);
      setSuccessMessage(t('notifications.register_success'));
      setTimeout(() => {
        setSuccessMessage(null);
        // navigate('/user');
        dispatch(authLogin({ dniCif, password, rememberMe: true }));
      }, 2000);
    } catch (error: any) {
      console.error(
        'Error:',
        error.message || t('errors.processing_form_error')
      );
      setFormError(error.message || t('errors.generic_form_error'));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* LOGIN SECTION */}
        <div className={styles.accordionSection}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              login
            </span>
            {t('forms.section_login')}
          </h3>
          <div className={styles.accordionContent}>
            <ul>
              <li>
                <FormInputText
                  labelText={t('forms.nif')}
                  id="dniCif"
                  name="dniCif"
                  value={formApplicantData.dniCif || ''}
                  onChange={handleTextChange}
                />
                {dniCifError && (
                  <Notification type="error" message={dniCifError} />
                )}
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
                {emailError && (
                  <Notification type="error" message={emailError} />
                )}
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
            </ul>
          </div>
        </div>

        {/* PERSONAL INFORMATION SECTION */}
        <div className={styles.accordionSection}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              account_box
            </span>
            {t('forms.section_personal')}
          </h3>
          <div className={styles.accordionContent}>
            <ul>
              <li>
                <FormInputText
                  labelText={t('forms.name')}
                  id="name"
                  name="name"
                  value={formApplicantData.name || ''}
                  onChange={handleTextChange}
                />
              </li>
              <li>
                <FormInputText
                  labelText={t('forms.lastName')}
                  id="lastName"
                  name="lastName"
                  value={formApplicantData.lastName || ''}
                  onChange={handleTextChange}
                />
              </li>
              <li>
                <FormInputText
                  labelText={t('forms.phone')}
                  id="phone"
                  name="phone"
                  value={formApplicantData.phone || ''}
                  onChange={handleTextChange}
                />
              </li>
              <li>
                <FormInputText
                  labelText={t('forms.location')}
                  id="ubication"
                  name="ubication"
                  value={formApplicantData.ubication || ''}
                  onChange={handleTextChange}
                />
              </li>
              <h4>{t('forms.photo')}</h4>
              <li>
                <FormField
                  type="file"
                  name="photo"
                  label={t('forms.photo')}
                  className="applicantphoto"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={photoInputRef}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* RESUME/WORK SECTION */}
        <div className={styles.accordionSection}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              work
            </span>
            {t('forms.section_work')}
          </h3>
          <div className={styles.accordionContent}>
            <ul>
            <h4>{t('forms.cv')}</h4>
              <li>
              <FormField
              type="file"
              name="cv"
              label={t('forms.cv')}
              className="applicantcv"
              accept="application/pdf"
              ref={cvInputRef}
            />
              </li>
              <li>
                <FormSelect
                  labelText={t('forms.preferredWorkLocation')}
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
                  labelText={t('forms.mainSkills')}
                  id="mainSkills"
                  name="mainSkills"
                  // value={formApplicantData.mainSkills.map((skill) => skill._id)}
                  value={formApplicantData.mainSkills}
                  onChange={handleMultiSelectChange}
                  optionLabel="skill"
                  options={formattedSkills}
                />
              </li>
              <li>
                <FormMultiSelect
                  labelText={t('forms.wantedRole')}
                  id="wantedRol"
                  name="wantedRol"
                  // value={formApplicantData.wantedRol.map((rol) => rol._id)}
                  value={formApplicantData.wantedRol}
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
            </ul>
          </div>
        </div>

        <li>
          <Button type="submit" disabled={loading || !!error}>
            {t('buttons.saveAndFinish')}
          </Button>
        </li>

        {formError && <Notification type="error" message={formError} />}
        {successMessage && (
          <Notification message={successMessage} type="success" />
        )}
      </form>
    </>
  );
}
