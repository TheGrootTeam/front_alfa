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

export function AddNewOffer() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(getUi);
  const { offerStatus } = useSelector(getNewOfferState);
  //BALIZA
  console.log('INICIO: ', offerStatus);
  const [formData, setFormData] = useState({
    position: '',
    //Inicialization with the actual date AAA-MM-DD
    publicationDate: new Date().toISOString().split('T')[0],
    description: '',
    //DAL - Hasta que esté corregido el problema del login
    //companyOwner: { _id: '', name: '' },
    companyOwner: { _id: '66c6fc21a5c2d7c86aa0aa11', name: 'Apple' },
    //companyOwner: { _id: '66c39ce931e8368e0b95487d', name: 'Apple' },
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
    //BALIZA
    if (!loading && !error && offerStatus) {
      console.log('EN EL IF: ', offerStatus);
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        navigate('/');
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
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  //DAL -Prueba con librería de ventanas para mensajes
  // useEffect(() => {
  //   if (!loading && !error && offerStatus {
  //     setDatesSaved(true);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Your work has been saved",
  //       showConfirmButton: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate('/');
  //       }
  //     });
  //   }
  // }, [loading, error, offerStatus, navigate]);

  return (
    <Layout title={t('titles.add_offer')} page="newOffer">
      {showMessageDatesSaved && (
        <div>
          <b>{t('notifications.data_saved')}</b>
          <Notification message="New offer created successful" type="success" />
        </div>
      )}
      <form onSubmit={handleSubmit} id="newOffer-form" className={styles.form}>
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
        <p>
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
        {/* listApplicants: [], */}
        {/* <p>
          <FormInputNumber
            labelText={t('forms.number_applicants')}
            className="form__inputfield"
            id="numberApplicants"
            name="numberApplicants"
            value={numberApplicants}
            min={0}
            onChange={handleChange}
          />
        </p> */}
        <Button
          className="form__button"
          type="submit"
          disabled={
            !position ||
            !description ||
            !location ||
            typeJob === '' ||
            (internJob === '' && error !== null)
          }
        >
          {t('forms.save_offer_button')}
        </Button>
        {showMessageDatesSaved && (
          <div>
            <b>{t('forms.data_saved')}</b>
            <Notification
              message="New offer created successful"
              type="success"
            />
          </div>
        )}
      </form>
      <div onClick={resetError}>{error ? error : null}</div>
    </Layout>
  );
}
