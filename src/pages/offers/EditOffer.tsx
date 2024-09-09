import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUi, getToUpdateOfferState } from '../../store/selectors';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store/store';
import { Button } from '../../components/common/Button';
import styles from './EditOffer.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormInputNumber } from '../../components/formElements/formInputNumber';
import { FormTextarea } from '../../components/formElements/formTextareaProps';
import { FormSelect } from '../../components/formElements/formSelect';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { editOffersAction } from '../../store/actions/offersActions';
import Notification from '../../components/common/Notification';
import { uiSlice } from '../../store/reducers/uiSlice';
import { editOfferSlice } from '../../store/reducers/editOfferSlice';
import { useFormSelectOptions } from '../../hooks/useFormSelectOptions';

export function EditOffer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, error } = useSelector(getUi);
  const { offerStatus } = useSelector(getToUpdateOfferState);
  const dispatch = useDispatch<AppDispatch>();
  const theLocation = useLocation();
  const { offer } = theLocation.state || {};

  const jobOptions = useFormSelectOptions('job'); // options fot the typeJob selector
  const internOptions = useFormSelectOptions('internship'); // options for the internType selector

  const [formData, setFormData] = useState({
    id: offer.id || '',
    companyOwner: offer.companyOwner || null,
    position: offer.position || '',
    description: offer.description || '',
    status: offer.status,
    numberVacancies: offer.numberVacancies || 1,
    location: offer.location || '',
    typeJob: offer.typeJob || '',
    internJob: offer.internJob || '',
  });

  const [showMessageDatesSaved, setDatesSaved] = useState(false);
  const {
    position,
    description,
    status,
    numberVacancies,
    location,
    typeJob,
    internJob,
  } = formData;

  useEffect(() => {
    // Only resets if an offer has been edited and the page is navigated away
    if (offerStatus) {
      return () => {
        dispatch(editOfferSlice.actions.resetEditOfferState());
      };
    }
  }, [offerStatus, dispatch]);

  useEffect(() => {
    if (!loading && !error && offerStatus) {
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        navigate('/company');
      }, 3000); // Hide the messages in 3 sg
    }
  }, [loading, error, offerStatus, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editOffersAction({ ...offer, ...formData }));
  };

  // handleChange adapted of different kind of elements
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === 'checkbox' ? !target.checked : target.value;

    setFormData((currentData: any) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function showInfo() {
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
              <FormCheckbox
                id="status"
                labelText={t('forms.status_closed')}
                name="status"
                checked={!status}
                value=""
                onChange={handleChange}
              />
            </p>
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

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
