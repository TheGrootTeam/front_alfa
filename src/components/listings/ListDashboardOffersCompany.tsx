import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListDashboardOffersCompany.module.css';
import { ListDashboardOffersCompanyProps } from '../../utils/interfaces/IOffer';

export const ListDashboardOffersCompany: React.FC<
  ListDashboardOffersCompanyProps
> = ({ publishedOffers }) => {
  return (
    <div>
      {publishedOffers.map((offer) => (
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
          </Link>
          <p>[ Editar ] - [ Eliminar ]</p>
        </div>
      ))}
    </div>
  );
};
