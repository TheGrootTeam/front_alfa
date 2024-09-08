import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListDashboardOffersCompany.module.css';
import { ListDashboardOffersCompanyProps } from '../../utils/interfaces/IOffer';
import { offerDashboard } from '../../utils/interfaces/IOffer';

export const ListDashboardOffersCompany: React.FC<
  ListDashboardOffersCompanyProps
> = ({ publishedOffers }) => {
  return (
    <div>
      {/* On must Clone the array publishedOffers to use sort  */}
      {[...publishedOffers]
        /* Most recent offer first */
        .sort((a, b) => {
          const getTimeSignature = (offer: offerDashboard) =>
            offer.publicationDate
              ? new Date(offer.publicationDate).getTime()
              : 0;
          const dateDifference = getTimeSignature(b) - getTimeSignature(a);
          //If the day is the same
          return dateDifference !== 0
            ? dateDifference
            : b._id.localeCompare(a._id);
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
              <p>
                {offer.publicationDate
                  ? offer.publicationDate.split('T')[0]
                  : 'Fecha no disponible'}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
};
