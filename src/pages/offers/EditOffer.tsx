import { getUi } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { Button } from '../../components/common/Button';
import styles from './EditOffer.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormInputNumber } from '../../components/formElements/formInputNumber';
import { FormTextarea } from '../../components/formElements/formTextareaProps';
import { FormSelect } from '../../components/formElements/formSelect';
import { editOffersAction } from '../../store/actions/offersActions';
import Notification from '../../components/common/Notification';
import { useNavigate } from 'react-router-dom';
import { editOfferSlice } from '../../store/reducers/editOfferSlice';
import { getToUpdateOfferState } from '../../store/selectors';

export function EditOffer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, error } = useSelector(getUi);
  const { offerStatus } = useSelector(getToUpdateOfferState);
  const dispatch = useDispatch<AppDispatch>();

  //BALIZA
  //Se usa el siguiente formData para tener datos para probar el update
  //const [formData, setFormData] = useState(offerInfo);
  // type PartialIOffer = Partial<IOffer>;
  const [formData, setFormData] = useState({
    _id: '66c6fc21a5c2d7c86aa0aa1b',
    //_id: '66c6eefcd968c1558e5d30aa',
    position: 'Puesto de vespa',
    //publicationDate: '2024-08-19',
    description: 'ves-pa aquí, ves-pa allá!!',
    //companyOwner: { _id: '66c37b843ed5b9561ce5eb60' },
    status: true,
    numberVacancies: 2,
    location: 'Donostia',
    typeJob: 'hibrido',
    internJob: 'no_remunerado',
  });

  const [showMessageDatesSaved, setDatesSaved] = useState(false);
  const {
    position,
    description,
    //  status,
    numberVacancies,
    location,
    typeJob,
    internJob,
  } = formData;

  useEffect(() => {
    if (!loading && !error && offerStatus) {
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        navigate('/');
      }, 3000); // Hide the messages in 3 sg
    }
  }, [loading, error, offerStatus, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editOffersAction(formData));
  };

  // handleChange adapted of different kind of elements
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData((currentData: any) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  return (
    <>
      <Layout title={t('titles.edit_offer')} page="editoffer">
        {showMessageDatesSaved && (
          <div>
            <Notification
              message={t('notifications.offer_updated')}
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
        </form>
        {showMessageDatesSaved && (
          <div>
            <Notification
              message={t('notifications.offer_updated')}
              type="success"
            />
          </div>
        )}
      </Layout>
    </>
  );
}
