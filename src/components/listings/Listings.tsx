import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect, useState } from 'react';
import { getOffers } from '../../utils/serviceOffers';
import {
  ICustomErrorListings,
  IErrListings,
  IOfferMapped,
} from '../../utils/interfaces/IOffer';
import { isIErrListings, offersMapped } from '../../utils/utilsOffers';
import { ErrorsDisplay } from '../common/ErrorDisplay';

export function Listings() {
  const [offers, setOffers] = useState<IOfferMapped[]>([]);
  const [error, setError] = useState<ICustomErrorListings | string | null>(
    null
  );

  useEffect(() => {
    async function fetchOffers() {
      try {
        const offersList = await getOffers();

        if (offersList) {
          const mappedOffers = offersMapped(offersList);
          setOffers(mappedOffers);
        }
      } catch (err) {
        if (isIErrListings(err)) {
          // handling error from API
          const error = err as IErrListings;

          const errorObject: ICustomErrorListings = {
            message: error.error,
            status: error.status,
            statusText: error.statusText,
          };
          setError(errorObject);
        } else {
          // handling unknow error
          setError('Ups, se ha producido un error desconocido.');
        }
      }
    }
    fetchOffers();
  }, []);

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
