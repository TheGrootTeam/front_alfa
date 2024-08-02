import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect, useState } from 'react';
import { getOffers } from '../../utils/serviceOffers';
import { IOffer } from '../../utils/interfaces/IOffer';

export function Listings() {
  const [offers, setOffers] = useState<IOffer[]>([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const offersList = await getOffers();
        if (offersList) setOffers(offersList);
      } catch (error) {}
    }
    fetchOffers();
  }, []);

  return (
    <div className={styles.listings}>
      {offers.map((offer) => (
        <div key={offer._id}>
          <ListingDetail
            id={offer._id}
            companyOwner={offer.companyOwner}
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
