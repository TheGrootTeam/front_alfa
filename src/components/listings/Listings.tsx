import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect } from 'react';
import { ErrorsDisplay } from '../common/ErrorDisplay';
import { getOffersState, getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getOffersAction } from '../../store/actions/offersActions';

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
              companyOwner={offer.companyOwner.name}
              description={offer.description}
              numberApplicants={offer.numberApplicants}
              numberVacancies={offer.numberVacancies}
              position={offer.position}
              status={offer.status}
            />
          </div>
        ))}
      </div>
    );
  }

  return <>{error ? showError() : showOffers()}</>;
}
