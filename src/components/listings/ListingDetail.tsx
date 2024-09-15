import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IOfferListingDetail } from '../../utils/interfaces/IOffer';
import styles from './ListingDetail.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import ContactForm from '../forms/ContactForm';
import { formatDate } from '../../utils/utilsDates';
import { getApplicantInfo, getIsLogged } from '../../store/selectors';

export function ListingDetail({
  id,
  companyOwner,
  description,
  internJob,
  location,
  // numberApplicants,
  numberVacancies,
  position,
  publicationDate,
  typeJob,
}: IOfferListingDetail) {
  // const formattedDate = new Date(publicationDate).toLocaleDateString('es-ES', {
  //   day: '2-digit',
  //   month: '2-digit',
  //   year: 'numeric',
  // });

  const { t } = useTranslation();

  const isLogged = useSelector(getIsLogged);
  const applicantInfo = useSelector(getApplicantInfo);
  const applicantEmail = applicantInfo?.email || '';
  const applicantId = applicantInfo?.id || '';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => setIsModalOpen(false);

  // function to open the modal or redirect login
  const handleOpenModal = () => {
    if (!isLogged) {
      // redirect login if you are not logged
      navigate('/login');
    } else {
      // If you are logo, open the modal
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.listingDetail}>
      <header>
        <Link to={`/offers/${id}`}>
          <h2>{position}</h2>
        </Link>
        <h3>
          <span className={`material-symbols-outlined ${styles.iconSmall}`}>
            group
          </span>
          {numberVacancies}{' '}
          {t('plurals.vacancy', { count: Number(numberVacancies) })}
          {/* | Número solicitantes:{' '}
          {numberApplicants} */}
        </h3>
      </header>
      <div className="content">
        {/* DAL - Para adaptarlo el ISO?*/}
        {/* <p>Publicado el: {publicationDate.toDateString()}</p> */}
        <p className={styles.date}>
          {/* {t('gen.published_on')} {formattedDate} */}
          {t('gen.published_on')} {formatDate(publicationDate)}
        </p>
        <div className={styles.description}>{description}</div>
      </div>
      <footer>
        <p>
          <span className={`material-symbols-outlined ${styles.iconSmall}`}>
            domain
          </span>{' '}
          {companyOwner.name}
        </p>
        <p>
          <span className={`material-symbols-outlined ${styles.iconSmall}`}>
            location_on
          </span>
          {location}
        </p>
        <p>
          <span className={`material-symbols-outlined ${styles.iconSmall}`}>
            work
          </span>{' '}
          {typeJob} / {internJob}
        </p>
      </footer>

      {isLogged && (
        <>
          <Button onClick={handleOpenModal} className={styles.contactButton}>
            {t('buttons.mail_contact_company')}
          </Button>

          <ContactForm
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            companyId={companyOwner._id}
            offerName={position}
            applicantEmail={applicantEmail}
            applicantId={applicantId}
            applicantName={applicantInfo?.name || ''} // Pass the applicant's name
            applicantLastName={applicantInfo?.lastName || ''} 
          />
        </>
      )}
    </div>
  );
}
