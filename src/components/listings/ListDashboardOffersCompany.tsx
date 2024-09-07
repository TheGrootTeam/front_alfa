import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListDashboardOffersCompany.module.css';
import { ListDashboardOffersCompanyProps } from '../../utils/interfaces/IOffer';

export const ListDashboardOffersCompany: React.FC<
  ListDashboardOffersCompanyProps
> = ({ publishedOffers }) => {
  return (
    <div>
      {/* On must Clone the array publishedOffers to use sort  */}
      {[...publishedOffers]
        /* Most recent offer first */
        .sort((a, b) => {
          const date_A = new Date(a.publicationDate).getTime();
          const date_B = new Date(b.publicationDate).getTime();
          return date_B - date_A;
        })
        .map((offer) => (
          <div className={styles.offer_list} key={offer._id}>
            <Link to={`/offers/${offer._id}`}>
              <h3>{offer.position}</h3>
              <p>
                {offer.location} -{' '}
                {offer.status ? (
                  'Oferta Activa'
                ) : (
                  <span className={styles.disabled}> Oferta Cerrada</span>
                )}
              </p>
              <p>{offer.publicationDate.split('T')[0]}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};
