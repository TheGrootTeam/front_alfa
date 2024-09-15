import styles from './Listings.module.css';
import { ListingDetail } from './ListingDetail';
import { useEffect, useState } from 'react';
import { getOffersState, getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getOffersAction } from '../../store/actions/offersActions';
import { Loader } from '../common/Loader';
import Notification from '../common/Notification';
import { uiSlice } from '../../store/reducers/uiSlice';
import { useLocation } from 'react-router-dom';
import Pagination from '../common/Pagination';

export function Listings() {
  const offers = useSelector(getOffersState);
  const { loading, error } = useSelector(getUi);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const containerClass =
    location.pathname === '/'
      ? `${styles.listings} ${styles.homePage}`
      : styles.listings;

  useEffect(() => {
    dispatch(getOffersAction());
  }, [dispatch]);

  useEffect(() => {
    setTotalPages(Math.ceil(offers.length / 10));
  }, [offers]);

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function handlePagination(newPage: number) {
    setCurrentPage(newPage);
  }

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  function showOffers() {
    return (
      <div className={containerClass}>
        {offers.map((offer, index) => {
          const min = currentPage * 10 - 10;
          const max = currentPage * 10 - 1;
          if (min <= index && index <= max) {
            return (
              <div key={offer.id}>
                <ListingDetail
                  id={offer.id}
                  companyOwner={offer.companyOwner}
                  description={offer.description}
                  internJob={offer.internJob}
                  location={offer.location}
                  numberApplicants={offer.numberApplicants}
                  numberVacancies={offer.numberVacancies}
                  publicationDate={offer.publicationDate} // Convertir de vuelta a Date si es necesario
                  position={offer.position}
                  status={offer.status}
                  typeJob={offer.typeJob}
                />
              </div>
            );
          }
        })}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePagination}
        />
      </div>
    );
  }

  return (
    <>
      {loading && <Loader />}
      {error ? showError() : showOffers()}
    </>
  );
}
