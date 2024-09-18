import { Link } from 'react-router-dom';
import { IOfferListingDetail } from '../../utils/interfaces/IOffer';
import styles from './ListingDetail.module.css';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/utilsDates';

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
  const { t } = useTranslation();

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
        </h3>
      </header>
      <div className="content">
        <p className={styles.date}>
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
    </div>
  );
}
