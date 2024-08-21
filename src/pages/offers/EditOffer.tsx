import { getUi } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
import { useState } from 'react';
import { getToUpdateOfferState } from '../../store/selectors';

import Layout from '../../components/layout/Layout';
//import { AppDispatch } from '../../store/store';
import { Button } from '../../components/common/Button';
import styles from './EditOffer.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormInputNumber } from '../../components/formElements/formInputNumber';
import { FormTextarea } from '../../components/formElements/formTextareaProps';
import { FormSelect } from '../../components/formElements/formSelect';
import { editOffersAction } from '../../store/actions/offersActions';

export function EditOffer() {
  const { loading, error } = useSelector(getUi);
  const dispatch = useDispatch<AppDispatch>();
  const { offerInfo } = useSelector(getToUpdateOfferState);

  //BALIZA
  //Se usa el siguiente formData para tener datos para probar el update
  //const [formData, setFormData] = useState(offerInfo);
  type PartialIOffer = Partial<IOffer>;
  const [formData, setFormData] = useState<PartialIOffer>({
    _id: '66c5b8b69892910d72c9fd22',
    position: 'Casos de update',
    //publicationDate: '2024-08-19',
    description:
      'Pruebas update hardcodeada; hasta ser accesible desde companies',
    //companyOwner: { _id: '66c37b843ed5b9561ce5eb60' },
    status: true,
    numberVacancies: 1,
    //listApplicants: [],
    //numberApplicants: 1,
    location: 'Donostia',
    typeJob: 'hibrido',
    internJob: 'no_remunerado',
  });

  const [showMessageDatesSaved, setDatesSaved] = useState(false);
  const filterIdOffer = formData._id;
  const {
    position,
    description,
    status,
    numberVacancies,
    location,
    typeJob,
    internJob,
  } = formData;

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
      <Layout title="Edit Offer" page="editoffer">
        <form
          onSubmit={handleSubmit}
          id="newOffer-form"
          className={styles.form}
        >
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
          <Button
            className="form__button"
            type="submit"
            disabled={
              (!position ||
                !description ||
                !location ||
                typeJob == '' ||
                internJob == '') &&
              error !== null
            }
          >
            Save Offer
          </Button>
          {showMessageDatesSaved && (
            <div>
              <b>Datos guardados</b>
            </div>
          )}
        </form>
      </Layout>
    </>
  );
}
