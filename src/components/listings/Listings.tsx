import styles from './Listings.module.css';
import ListingDetail from './ListingDetail';
import { useEffect, useState } from 'react';
import { getOffers } from '../../utils/serviceOffers';

export function Listings() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const offersList = await getOffers();
        setOffers(offersList);
      } catch (error) {}
    }
  });

  return (
    <div className={styles.listings}>
      {offers.map((listing) => (
        <ListingDetail
          key={listing.id}
          id={listing.id}
          title={listing.title}
          description={listing.description}
        />
      ))}
    </div>
  );
}
