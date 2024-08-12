import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormInputNumber } from '../../components/formElements/formInputNumber';
import { FormTextareaProps } from '../../components/formElements/formTextareaProps';
import styles from "./AddNewOffer.module.css";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { createOffersAction } from '../../store/actions/offersActions';
import { Button } from '../../components/common/Button';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';


export function AddNewOffer() {
  const navigate = useNavigate();
  const {loading, error} = useSelector(getUi);

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    position: '',
    //Inicialization with the actual date AAA-MM-DD
    publicationDate: new Date().toISOString().split('T')[0],
    description: '',
    //DAL - Hasta que esté corregido el problema del login
    //companyOwner: { _id: '', name: '' },
    companyOwner: { _id: '66b52992d440e902e52c1ecd', name: 'Apple' },
    status: true,
    numberVacancies: 1,
    listApplicants: [],
    numberApplicants: 0
  });

  
  const [showMessageDatesSaved, setDatesSaved] = useState(false);

  const { position, publicationDate, description, numberVacancies } = formData;


  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createOffersAction(formData));

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
  
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };
  

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  // DAL
  // useEffect(() => {
  //   if (!loading && !error) {
  //     setDatesSaved(true);
  //     setTimeout(() => setDatesSaved(false), 5000); // Hide the messages in 5 sg
  //   }
  // }, [loading, error]);

  useEffect(() => {
    if (!loading && !error) {
      setDatesSaved(true);
      setTimeout(() => {
        setDatesSaved(false);
        navigate('/');
      }, 5000); // Hide the messages in 5 sg
    }
  }, [loading, error, navigate]);


  return (
    <Layout title="New Offer" page="newOffer">
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
            readOnly = {true}
          />
        </p>
        <p>
          <FormTextareaProps
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
        {/*  companyOwner  <- automatic asignation*/}
        {/*  Status  <- is it tru */}
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
          disabled={!position || !description  && error !== null }
        >
          Save Offer
        </Button>
        {showMessageDatesSaved && <div>Datos guardados</div>}
      </form>
      <div onClick={resetError}>{error ? error : null}</div>
    </Layout>
  );
}
