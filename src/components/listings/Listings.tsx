import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect } from 'react';
import { ErrorsDisplay } from '../common/ErrorDisplay';
import { getOffersState, getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getOffersAction } from '../../store/actions/offersActions';
import { Loader } from '../common/Loader';

export function Listings() {
  const offers = useSelector(getOffersState);
  const { loading, error } = useSelector(getUi);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOffersAction());
  }, [dispatch]);

  function showError() {
    return <ErrorsDisplay content={error} />;
  }

  function showOffers() {
    return (
      <div className={styles.listings}>
        {offers.map((offer) => (
          <div key={offer.id}>
            <ListingDetail
              id={offer.id}
              //companyOwner={offer.companyOwner.name}
              //DAL - hasta tener acceso a los usuarios
              companyOwner={'PRUEBA'}
              description={offer.description}
              internJob={offer.internJob}
              location={offer.location}
              numberApplicants={offer.numberApplicants}
              numberVacancies={offer.numberVacancies}
              //DAL
              //publicationDate={new Date(offer.publicationDate)} // Convertir de vuelta a Date si es necesario
              publicationDate={offer.publicationDate} // Convertir de vuelta a Date si es necesario
              position={offer.position}
              status={offer.status}
              typeJob={offer.typeJob}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {loading && <Loader />}
      {error ? showError() : showOffers()}
    </>
  );
}
