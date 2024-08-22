import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { getOffer } from '../../store/selectors';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
// import styles from "./Offermodule.css";

export function OfferPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const offer: IOfferMapped | undefined = useSelector(getOffer(id));

  const [showConfirm, setShowCofirm] = useState(false);

  const deleteOffer = () => {
    //DELETE AD
  };

  const editOffer = () => {
    //EDIT AD
  };

  useEffect(() => {
    //dispatch(getOfferAction(id));
  }, [id, dispatch]);


  return (
    <>
      <Layout page="offer">
        {offer ? (
          <>
            <h2>Título: {offer.position}</h2>
            <p>Descripción: {offer.description}</p>
            <p>Empresa: {`${offer.companyOwner}`}</p>
            <p>Ciudad: {offer.location}</p>
            <p>
              Modalidad de prácticas: {offer.typeJob} y {offer.internJob}
            </p>
            <p>
              Publicado el: {offer.publicationDate.toISOString().split('T')[0]}
            </p>
            <p>
              Número vacantes: {offer.numberVacancies} | Número solicitantes:{' '}
              {offer.numberApplicants}
            </p>
            <Button onClick={editOffer}>Edit Offer</Button>
            {showConfirm && (
              <div>
                <p>Are you sure you want to delete the offer?</p>
                <Button onClick={deleteOffer}>YES! Delete the Offer</Button>
                <Button onClick={() => setShowCofirm(false)}>NO! Cancel</Button>
              </div>
            )}
            {!showConfirm && (
              <Button onClick={() => setShowCofirm(true)}>Delete Offer</Button>
            )}
          </>
        ) : (
          `Not Found`
        )}
      </Layout>
    </>
  );
}
