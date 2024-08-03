import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect, useState } from 'react';
import { getOffers } from '../../utils/serviceOffers';
import {
  ICustomErrorListings,
  IErrListings,
  IOffer,
} from '../../utils/interfaces/IOffer';
import { isIErrListings } from '../../utils/utilsOffers';

export function Listings() {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [error, setError] = useState<ICustomErrorListings | string | null>(
    null
  );

  useEffect(() => {
    async function fetchOffers() {
      try {
        const offersList = await getOffers();
        if (offersList) setOffers(offersList);
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

  return (
    <div className={styles.listings}>
      {offers.map((offer) => (
        <div key={offer._id}>
          <ListingDetail
            id={offer._id}
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
