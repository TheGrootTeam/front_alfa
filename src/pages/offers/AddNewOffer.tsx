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
//import { newOfferSlice } from '../../store/reducers/newOfferSlice';
import { Button } from '../../components/common/Button';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/common/Notification';

export function AddNewOffer() {
  const navigate = useNavigate();
  const { loading, error } = useSelector(getUi);
  const { offerInfo } = useSelector(getNewOfferState);
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    if (!loading && !error && offerInfo) {
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        navigate('/');
      }, 5000); // Hide the messages in 5 sg
    }
  }, [loading, error, offerInfo, navigate]);

  //DAL -Prueba con librería de ventanas para mensajes
  // useEffect(() => {
  //   if (!loading && !error && offerInfo) {
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
  // }, [loading, error, offerInfo, navigate]);

  return (
    <Layout title="New Offer" page="newOffer">
      {showMessageDatesSaved && (
        <div>
          <Notification message="New offer created successful" type="success" />
        </div>
      )}
      <form onSubmit={handleSubmit} id="newOffer-form" className={styles.form}>
        <p>
          <FormInputText
            labelText="Position"
            className="form__inputfield"
            id="position"
            name="position"
            value={position}
            onChange={handleChange}
          />
        </p>
        <p>
          <FormInputText
            labelText="Publication Date"
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
            labelText="Description"
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
            labelText="Location"
            className="form__inputfield"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </p>
        <p>
          <FormSelect
            label="Type of Job"
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
            label="Type of internship"
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
            labelText="NumberVacancies"
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
            labelText="NumberApplicants"
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
          Save Offer
        </Button>
        {showMessageDatesSaved && (
          <div>
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
