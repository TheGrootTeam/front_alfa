import styles from './Listings.module.css';
import ListingDetail from './ListingDetail';

const listingsData = [
  { id: 1, title: 'Offer 1', description: 'Description for offer 1' },
  { id: 2, title: 'Offer 2', description: 'Description for offer 2' }
];

export function Listings() {
  return (
    <div className={styles.listings}>
      {listingsData.map(listing => (
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
