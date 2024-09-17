import { useDispatch } from 'react-redux';
import styles from './EditProfileApplicant.module.css';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getApplicantInfo, getUi } from '../../store/selectors';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';
import { useEffect, useRef, useState } from 'react';
import { FormInputText } from '../../components/formElements/formInputText';
import Notification from '../../components/common/Notification';
import { IEditApplicantInfo } from '../../utils/interfaces/IProfile';
import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { updateApplicantUser } from '../../utils/services/editService';
import { Link } from 'react-router-dom';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { FormSelect } from '../../components/formElements/formSelect';
import { FormMultiSelect } from '../../components/formElements/formMultiselect';
import { Button } from '../../components/common/Button';
import {
  skills as rawSkills,
  rols as rawRoles,
} from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API
import { MainSkill, WantedRol } from '../../utils/interfaces/IInfoApplicant';
import FormField from '../../components/formElements/formFile';
import { applicantInfoSlice } from '../../store/reducers/infoApplicantSlice';
import { useNavigate } from 'react-router-dom';

const formattedSkills = rawSkills.map((skill) => ({
  _id: skill._id,
  skill: skill.skill,
}));

const formattedRoles = rawRoles.map((role) => ({
  _id: role._id,
  rol: role.rol,
}));

export function EditUserProfilePage() {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(getUi);
  const applicant = useSelector(getApplicantInfo);

  const jobOptions = useFormSelectOptions('job'); // opciones para el selector typeJob
  const internOptions = useFormSelectOptions('internship'); // opciones para el selector internType

  const navigate = useNavigate();

  const setVariables = {
    id: '',
    dniCif: '',
    name: '',
    lastName: '',
    email: '',
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
  };
  const [formApplicantData, setApplicantFormData] =
    useState<IEditApplicantInfo>(setVariables);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

  const [initialData, setInitialData] =
    useState<IEditApplicantInfo>(setVariables);

  useEffect(() => {
    dispatch(getInfoApplicantAction());
    const userInfo = {
      id: applicant.id,
      dniCif: applicant.dniCif,
      name: applicant.name,
      email: applicant.email,
      lastName: applicant.lastName,
      phone: applicant.phone,
      photo: applicant.photo,
      cv: applicant.cv,
      ubication: applicant.ubication,
      typeJob: applicant.typeJob,
      internType: applicant.internType,
      wantedRol: applicant.wantedRol,
      mainSkills: applicant.mainSkills,
      geographically_mobile: applicant.geographically_mobile,
      disponibility: applicant.disponibility,
    };
    setApplicantFormData(userInfo);
    setInitialData(userInfo);
  }, [dispatch, applicant]);

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dataModified, setDataModified] = useState(false);

  // VALIDACIONES
  const [emailError, setEmailError] = useState<string | null>(null);

  const { email } = formApplicantData;

  useEffect(() => {
    if (email && !isValidEmail(email)) setEmailError(t('errors.email_invalid'));
    else setEmailError(null);
  }, [email, t]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validacion formulario completo al enviar (campos requeridos)
  const validateForm = (
    formApplicantData: IEditApplicantInfo,
    t: (key: string) => string
  ): { isValid: boolean; errorMessage: string } => {
    setFormError(null);

    const requiredFields = {
      dniCif: t('forms.nif'),
      name: t('forms.name'),
      lastName: t('forms.lastName'),
      email: t('forms.email'),
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
        !formApplicantData[field as keyof IEditApplicantInfo] ||
        (formApplicantData[field as keyof IEditApplicantInfo] as string)
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
    //To activate the form button
    setDataModified(true);
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de las CHECKBOX
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    //To activate the form button
    setDataModified(true);
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // manejo de los SELECT simples
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    //To activate the form button
    setDataModified(true);
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de los MULTISELECT
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;

    //Convert selected values to an ID's array
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value); // Collect selected IDs

    // Find skill or role value by id
    let selectedValuesFormatted: Array<MainSkill | WantedRol> = [];
    if (name === 'mainSkills') {
      selectedValuesFormatted = formattedSkills.filter((skill) =>
        selectedValues.includes(skill._id)
      );
    } else if (name === 'wantedRol') {
      selectedValuesFormatted = formattedRoles.filter((role) =>
        selectedValues.includes(role._id)
      );
    }
    //To activate the form button
    setDataModified(true);
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: selectedValuesFormatted,
    }));
  };

  // Handling files type fields

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //To activate the form button
      setDataModified(true);

      const file = e.target.files[0];
      setApplicantFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //To activate the form button
      setDataModified(true);

      const file = e.target.files[0];
      setApplicantFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
    }
  };

  // Envio de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDataModified(false);
    const photo =
      photoInputRef?.current?.files && photoInputRef.current.files.length > 0
        ? photoInputRef.current.files[0]
        : applicant.photo;
    const cv =
      cvInputRef?.current?.files && cvInputRef.current.files.length > 0
        ? cvInputRef.current.files[0]
        : applicant.cv;

    // si hay errores de formato o faltan campos requeridos no se envía
    if (emailError) return;
    const { isValid, errorMessage } = validateForm(formApplicantData, t);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // si todo ok procedemos
    try {
      if (
        initialData === formApplicantData &&
        initialData.cv === cv &&
        initialData.photo === photo
      ) {
        return;
      }
      // Add files to formApplicantData
      formApplicantData.photo = photo;
      formApplicantData.cv = cv;

      const result = await updateApplicantUser(formApplicantData, t);
      console.log('User info updated successfully:', result);
      setSuccessMessage(t('notifications.data_updated'));

      // Reset current value in photo and cv inputs
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
      if (cvInputRef.current) {
        cvInputRef.current.value = '';
      }

      dispatch(applicantInfoSlice.actions.resetApplicantInfoStore());
    } catch (error) {
      console.error(t('errors.processing_form_error'), error);
      setFormError(t('errors.generic_form_error'));
    }
  };

  useEffect(() => {
    if (!loading && !error && successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/user');
      }, 3000); // Hide the messages in 3 sg and redirect
    }
  }, [loading, error, successMessage, navigate]);

  return (
    <Layout title={t('titles.userprofile_edit')} page="edituserprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <div className={styles.readonly}>
              <h3>
                {t('forms.cif')}: {formApplicantData.dniCif}
              </h3>
              <p>{t('msg.change_DNI')}</p>
            </div>
          </li>
          <li>
            <FormInputText
              labelText={t('forms.email')}
              id="email"
              name="email"
              type="email"
              value={formApplicantData.email}
              onChange={handleTextChange}
            />
            {emailError && <Notification type="error" message={emailError} />}
          </li>
          <div className={styles.readonly}>
            <p>{t('forms.password')}: **********</p>
            <li>
              <Link to="/change_password">{t('buttons.change_password')}</Link>
            </li>
          </div>
          <li>
            <FormInputText
              labelText={t('forms.name')}
              id="name"
              name="name"
              value={formApplicantData.name}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.lastName')}
              id="lastName"
              name="lastName"
              value={formApplicantData.lastName}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.phone')}
              id="phone"
              name="phone"
              value={formApplicantData.phone}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.location')}
              id="ubication"
              name="ubication"
              value={formApplicantData.ubication}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormField
              type="file"
              name="photo"
              label={t('forms.photo')}
              className="applicantphoto"
              accept="image/png, image/jpg, image/jpeg"
              ref={photoInputRef}
              //To activate the form button
              onChange={handlePhotoChange}
            />
            <p>
              {t('forms.actual_photo')}:{' '}
              {typeof formApplicantData.photo === 'string'
                ? `${formApplicantData.photo}`
                : '--'}
            </p>
          </li>
          <li>
            <FormField
              type="file"
              name="cv"
              label={t('forms.cv')}
              className="applicantcv"
              accept="application/pdf"
              ref={cvInputRef}
              //To activate the form button
              onChange={handleCvChange}
            />
            <p>
              {t('forms.actual_photo')}:{' '}
              {typeof formApplicantData.cv === 'string'
                ? `${formApplicantData.cv}`
                : '--'}
            </p>
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
              value={formApplicantData.internType}
              onChange={handleSelectChange}
              options={internOptions}
            />
          </li>
          <li>
            <FormMultiSelect
              labelText={t('forms.mainSkills')}
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
              labelText={t('forms.wantedRole')}
              id="wantedRol"
              name="wantedRol"
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
            <Button
              type="submit"
              disabled={loading || !!error || !dataModified}
            >
              {t('buttons.saveAndFinish')}
            </Button>
          </li>
        </ul>
        {formError && <Notification type="error" message={formError} />}
        {successMessage && (
          <Notification message={successMessage} type="success" />
        )}
      </form>
    </Layout>
  );
}
