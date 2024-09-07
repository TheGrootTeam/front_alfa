import { useDispatch } from 'react-redux';
//import Swal from 'sweetalert2';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormInputNumber } from '../../components/formElements/formInputNumber';
import { FormTextarea } from '../../components/formElements/formTextareaProps';
import { FormSelect } from '../../components/formElements/formSelect';
import styles from './AddNewOffer.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { getNewOfferState } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { createOffersAction } from '../../store/actions/offersActions';
import { Button } from '../../components/common/Button';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Notification } from '../../components/common/Notification';
import { newOfferSlice } from '../../store/reducers/newOfferSlice';
import { getCompanyInfo } from '../../store/selectors';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';

export function AddNewOffer() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(getUi);
  const { offerStatus } = useSelector(getNewOfferState);
  const company = useSelector(getCompanyInfo);

  const jobOptions = useFormSelectOptions('job'); // opciones para el selector typeJob
  const internOptions = useFormSelectOptions('internship'); // opciones para el selector internType

  const [formData, setFormData] = useState({
    position: '',
    //Inicialization with the actual date AAA-MM-DD
    publicationDate: new Date().toISOString().split('T')[0],
    description: '',
    companyOwner: { _id: company.id, name: company.name },
    status: true,
    numberVacancies: 1,
    listApplicants: [],
    numberApplicants: 0,
    location: '',
    typeJob: '',
    internJob: '',
  });

  const [showMessageDatesSaved, setDatesSaved] = useState(false);
  const {
    position,
    publicationDate,
    description,
    numberVacancies,
    location,
    typeJob,
    internJob,
  } = formData;

  useEffect(() => {
    // Only resets if an offer has been created and the page is navigated away
    if (offerStatus) {
      return () => {
        dispatch(newOfferSlice.actions.resetNewOfferState());
      };
    }
  }, [offerStatus, dispatch]);

  useEffect(() => {
    if (!loading && !error && offerStatus) {
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        //BALIZA
        // navigate('/');
        navigate('/company');
      }, 3000); // Hide the messages in 3 sg
    }
  }, [loading, error, offerStatus]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createOffersAction(formData));
  };

  // handleChange adapted of different kind of elements
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function showInfo() {
    return (
      <Layout title={t('titles.add_offer')} page="newOffer">
        {showMessageDatesSaved && (
          <div>
            <Notification
              message={t('notifications.data_saved')}
              type="success"
            />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          id="newOffer-form"
          className={styles.form}
        >
          <p>
            <FormInputText
              labelText={t('forms.position')}
              className="form__inputfield"
              id="position"
              name="position"
              value={position}
              onChange={handleChange}
            />
          </p>
          <p>
            <FormInputText
              labelText={t('forms.publication_date')}
              className="form__inputfield"
              id="publicationDate"
              name="publicationDate"
              value={publicationDate}
              onChange={handleChange}
              readOnly={true}
            />
          </p>
          <p>
            <FormTextarea
              labelText={t('forms.description')}
              className="form__inputfield"
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              rows={5}
              cols={20}
            />
          </p>
          <p>
            <FormInputText
              labelText={t('forms.location')}
              className="form__inputfield"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </p>
          {/* MARTA - lo dejo comentado hasta verificar <p>
            <FormSelect
              label={t('forms.job_type')}
              name="typeJob"
              value={typeJob}
              onChange={handleChange}
              options={{
                valueInicial: '',
                presencial: 'presencial',
                teletrabajo: 'teletrajo',
                hibrido: 'hibrido',
              }}
            />
          </p>
          <p>
            <FormSelect
              label={t('forms.internship_type')}
              name="internJob"
              value={internJob}
              onChange={handleChange}
              options={{
                valueInicial: '',
                no_remunerado: 'no remunerado',
                remunerado: 'remunerado',
                ong: 'ONG',
              }}
            />
          </p> */}
          <p>
            <FormSelect
              labelText={t('forms.job_type')}
              id="typeJob"
              name="typeJob"
              value={typeJob}
              onChange={handleChange}
              options={jobOptions}
            />
          </p>
          <p>
            <FormSelect
              labelText={t('forms.internship_type')}
              id="internJob"
              name="internJob"
              value={internJob}
              onChange={handleChange}
              options={internOptions}
            />
          </p>
          <p>
            <FormInputNumber
              labelText={t('forms.number_vacancies')}
              className="form__inputfield"
              id="numberVacancies"
              name="numberVacancies"
              value={numberVacancies}
              min={1}
              onChange={handleChange}
            />
          </p>
          <Button
            className="form__button"
            type="submit"
            disabled={
              showMessageDatesSaved ||
              !position ||
              !description ||
              !location ||
              typeJob === '' ||
              (internJob === '' && error !== null)
            }
          >
            {t('forms.save_offer_button')}
          </Button>
        </form>
        <div onClick={resetError}>{error ? error : null}</div>
        {showMessageDatesSaved && (
          <div>
            <Notification
              message={t('notifications.data_saved')}
              type="success"
            />
          </div>
        )}
      </Layout>
    );
  }

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
