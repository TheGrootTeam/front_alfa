import React from 'react';
import { Link } from 'react-router-dom';
import stylesDetail from './ListingDetail.module.css';
import styles from './ListDashboardOffersCompany.module.css';
import { ListDashboardOffersCompanyProps } from '../../utils/interfaces/IOffer';
import { offerDashboard } from '../../utils/interfaces/IOffer';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';

export const ListDashboardOffersCompany: React.FC<
  ListDashboardOffersCompanyProps
> = ({ publishedOffers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const offersPerPage = 5; // NUEVO: Número de ofertas por página

  useEffect(() => {
    setTotalPages(Math.ceil(publishedOffers.length / offersPerPage));
  }, [publishedOffers]);

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.listings}>
      <div className={styles.listingsContainer}>
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
          .slice((currentPage - 1) * offersPerPage, currentPage * offersPerPage)
          .map((offer) => (
            <div
              className={`${stylesDetail.listingDetail} ${styles.marged}`}
              key={offer._id}
            >
              <header>
                <Link to={`/offers/${offer._id}`}>
                  <h2>{offer.position}</h2>
                </Link>
              </header>
              <div>
                <h3>
                  {offer.status ? (
                    <span className={`material-symbols-outlined`}> group </span>
                  ) : (
                    <span
                      className={`material-symbols-outlined ${styles.disabled}`}
                    >
                      group{' '}
                    </span>
                  )}
                  <span>
                    {offer.status ? (
                      'Oferta Activa'
                    ) : (
                      <span className={styles.disabled}>Oferta Cerrada</span>
                    )}
                  </span>
                </h3>
              </div>
              <footer>
                <p className={stylesDetail.date}>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    calendar_month
                  </span>
                  <span>
                    {offer.publicationDate
                      ? offer.publicationDate.split('T')[0]
                      : 'Fecha no disponible'}
                  </span>
                </p>
                <p>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    location_on
                  </span>
                  <span>{offer.location}</span>
                </p>
              </footer>
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage} // La página actual
        totalPages={totalPages} // El número total de páginas
        onPageChange={handlePagination} // Función para cambiar de página
      />
    </div>
  );
};
