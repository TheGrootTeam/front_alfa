import { useDispatch } from 'react-redux';
import styles from './EditProfileApplicant.module.css';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getApplicantInfo, getUi } from '../../store/selectors';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';
import { useEffect, useState } from 'react';
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

  const [formApplicantData, setApplicantFormData] =
    useState<IEditApplicantInfo>({
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
    });

  useEffect(() => {
    dispatch(getInfoApplicantAction());
    console.log(applicant)
    setApplicantFormData({
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
    });
  }, [dispatch, applicant]);

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      name: t('fields.name'),
      lastName: t('fields.lastName'),
      email: t('forms.email'),
      phone: t('fields.phone'),
      photo: t('fields.photo'),
      cv: t('fields.cv'),
      ubication: t('fields.location'),
      typeJob: t('fields.preferredWorkLocation'),
      internType: t('forms.preferredInternshipType'),
      wantedRol: t('fields.wantedRole'),
      mainSkills: t('fields.mainSkills'),
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
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // manejo de las CHECKBOX
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // manejo de los SELECT simples
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicantFormData((prevData) => ({
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

    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues, // Update the selected field (mainSkills or wantedRol) with IDs
    }));
  };

  // manejo de los FILE INPUT
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : { name: null };
    setApplicantFormData((prevData) => ({
      ...prevData,
      [name]: `${file.name}`,
    }));
  };

  // Envio de formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // si hay errores de formato o faltan campos requeridos no se envía
    if (emailError) return;
    const { isValid, errorMessage } = validateForm(formApplicantData, t);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // si todo ok procedemos
    try {
      let result;

      result = await updateApplicantUser(formApplicantData, t);
      console.log('User registered successfully:', result);

      setSuccessMessage(t('notifications.register_success'));
    } catch (error) {
      console.error(t('errors.processing_form_error'), error);
      setFormError(t('errors.generic_form_error'));
    }
  };

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
              labelText={t('fields.name')}
              id="name"
              name="name"
              value={formApplicantData.name}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.lastName')}
              id="lastName"
              name="lastName"
              value={formApplicantData.lastName}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.phone')}
              id="phone"
              name="phone"
              value={formApplicantData.phone}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('fields.location')}
              id="ubication"
              name="ubication"
              value={formApplicantData.ubication}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <label>{t('fields.photo')}</label>
            <input type="file" name="photo" onChange={handleFileChange} />
            <p>{t('forms.actual_photo')}: {formApplicantData.photo}</p>
          </li>
          <li>
            <label>{t('fields.cv')}</label>
            <input type="file" name="cv" onChange={handleFileChange} />
            <p>{t('forms.actual_cv')}: {formApplicantData.cv}</p>
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
              value={formApplicantData.internType}
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
    </Layout>
  );
}
