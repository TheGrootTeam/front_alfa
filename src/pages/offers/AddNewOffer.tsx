//import Layout from '../../components/layout/Layout';
// import styles from "./AddNewOffer.module.css";

// export function AddNewOffer() {
//   return (
//     <>
//       <Layout title="Add New Offer" page="addnewoffer"></Layout>
//     </>
//   );
// }


import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
//DAL
import { FormInputNumber } from '../../components/formElements/formInputNumber';
//
//import { FormCheckbox } from '../../components/formElements/formCheckbox';
import styles from "./AddNewOffer.module.css";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';

//
//import { authLogin } from '../../store/actions/authActions';

import { createOffersAction } from '../../store/actions/offersActions';


import { Button } from '../../components/common/Button';
import { AppDispatch } from '../../store/store';

//
//export function LoginPage() {
export function AddNewOffer() {
  const {loading, error} = useSelector(getUi);

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    position: '',
    publicationDate: '',
    description: '',
    companyOwner: { _id: '', name: '' },
    status: true,
    numberVacancies: 0,
    //listApplicants: string;
    listApplicants: [],
    numberApplicants: 0
  });

  
  const [showMessageDatesSaved, setDatesSaved] = useState(false);

  const { 
    position, publicationDate, description, companyOwner, status, numberVacancies, listApplicants, numberApplicants 
  } = formData;


  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createOffersAction(formData));

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  useEffect(() => {
    if (!loading && !error) {
      setDatesSaved(true);
      setTimeout(() => setDatesSaved(false), 5000); // Hide the messages in 5 sg
    }
  }, [loading, error]);


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
            labelText="PublicationDate"
            className="form__inputfield"
            id="publicationDate"
            name="publicationDate"
            value={publicationDate}
            onChange={handleChange}
          />
        </p>
        <p>
          <FormInputText
            labelText="Description"
            className="form__inputfield"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </p>
        {/*  companyOwner  */}
        {/*  Status  */}
        <p>
          <FormInputNumber
            labelText="NumberVacancies"
            className="form__inputfield"
            id="numberVacancies"
            name="numberVacancies"
            value={numberVacancies}
            onChange={handleChange}
          />
        </p>
        {/* listApplicants: [], */}
        <p>
          <FormInputNumber
            labelText="NumberApplicants"
            className="form__inputfield"
            id="numberApplicants"
            name="numberApplicants"
            value={numberApplicants}
            onChange={handleChange}
          />
        </p>
      
        

        
        {/* <p className={styles.withCheckbox}>
          <FormCheckbox
            labelText="Remember me"
            id="rememberMe"
            name="rememberMe"
            value={`${rememberMe === true}`}
            checked={rememberMe}
            onChange={handleChange}
          />
        </p> */}
        <Button
          className="form__button"
          type="submit"
          disabled={!position || !publicationDate || !description  && error !== null }
        >
          Save Offer
        </Button>
        <p>
          {showMessageDatesSaved && <div>Datos guardados</div>}
        </p>
      </form>
      <div onClick={resetError}>{error ? error : null}</div>
    </Layout>
  );
}
