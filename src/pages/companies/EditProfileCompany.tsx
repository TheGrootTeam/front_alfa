import { useTranslation } from 'react-i18next';
import styles from './EditProfileCompany.module.css';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getCompanyInfo, getUi } from '../../store/selectors';
import { useEffect, useState } from 'react';
import { updateCompanyUser } from '../../utils/services/editService';
import { FormInputText } from '../../components/formElements/formInputText';
import Notification from '../../components/common/Notification';
import { Button } from '../../components/common/Button';
import { sectors } from '../../utils/utilsInfoCollections'; // TEMPORAL hasta que los carguemos de la API
import { FormTextarea } from '../../components/formElements/formTextArea';
import { getInfoCompanyAction } from '../../store/actions/infoCompanyActions';
import { IEditCompanyInfo } from '../../utils/interfaces/IProfile';
import { Link } from 'react-router-dom';
import { companyInfoSlice } from '../../store/reducers/infoCompanySlice';

export function EditCompanyProfilePage() {
  const { t } = useTranslation();
  const company = useSelector(getCompanyInfo);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(getUi);

  const [formCompanyData, setCompanyFormData] = useState<IEditCompanyInfo>({
    dniCif: '',
    name: '',
    email: '',
    phone: '',
    sector: '',
    ubication: '',
    description: '',
    logo: '',
  });

  useEffect(() => {
    dispatch(getInfoCompanyAction());
    setCompanyFormData({
      dniCif: company.dniCif,
      name: company.name,
      sector: company.sector._id,
      email: company.email,
      phone: company.phone,
      ubication: company.ubication,
      description: company.description,
      logo: company.logo,
    });
  }, [dispatch, company]);

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // VALIDACIONES
  const [emailError, setEmailError] = useState<string | null>(null);

  const { email } = formCompanyData;

  useEffect(() => {
    if (email && !isValidEmail(email)) setEmailError(t('errors.email_invalid'));
    else setEmailError(null);
  }, [email, t]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validacion formulario completo al enviar (campos requeridos)
  const validateForm = (
    formCompanyData: IEditCompanyInfo,
    t: (key: string) => string
  ): { isValid: boolean; errorMessage: string } => {
    setFormError(null);

    const requiredFields = {
      dniCif: t('forms.cif'),
      name: t('forms.name'),
      email: t('forms.email'),
      phone: t('forms.phone'),
      ubication: t('forms.location'),
      description: t('forms.description'),
      logo: t('forms.logo'),
    };

    let isValid = true;
    let errorMessage = '';

    for (const [field, label] of Object.entries(requiredFields)) {
      const value = formCompanyData[field as keyof IEditCompanyInfo];

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
      errorMessage = `${t('forms.sector')} ${t('errors.required_field_error')}`;
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

    setCompanyFormData((prevData: IEditCompanyInfo) => ({
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
    if (emailError) return;
    const { isValid, errorMessage } = validateForm(formCompanyData, t);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // si todo ok procedemos
    try {
      let result;

      result = await updateCompanyUser(formCompanyData, t);
      console.log('Company information updated successfully:', result);

      setSuccessMessage(t('notifications.edit_success'));
      dispatch(companyInfoSlice.actions.resetCompanyInfoStore())

    } catch (error) {
      console.error(t('errors.processing_form_error'), error);
      setFormError(t('errors.generic_form_error'));
    }
  };

  return (
    <Layout title={t('titles.companyprofile_edit')} page="editcompanyprofile">
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <div className={styles.readonly}>
              <h3>
                {t('forms.cif')}: {formCompanyData.dniCif}
              </h3>
              <p>{t('msg.change_VAT')}</p>
            </div>
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
              value={formCompanyData.name || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.phone')}
              id="phone"
              name="phone"
              value={formCompanyData.phone || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="sector">{t('forms.sector')}</label>
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
              labelText={t('forms.location')}
              id="ubication"
              name="ubication"
              value={formCompanyData.ubication || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormTextarea
              labelText={t('forms.description')}
              id="description"
              name="description"
              value={formCompanyData.description || ''}
              onChange={handleTextChange}
            />
          </li>
          <li>
            <label>{t('forms.logo')}</label>
            <input type="file" name="logo" onChange={handleFileChange} />
          </li>
          <li>
            <Button type="submit" disabled={loading || !!error}>
              {t('buttons.save_changes')}
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
