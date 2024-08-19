import { Link } from 'react-router-dom';
import { IOfferListingDetail } from '../../utils/interfaces/IOffer';
import styles from './ListingDetail.module.css';
// import { Button } from '../common/Button';

export function ListingDetail({
  id,
  companyOwner,
  description,
  internJob,
  location,
  numberApplicants,
  numberVacancies,
  position,
  publicationDate,
  typeJob,
}: IOfferListingDetail) {
  return (
    <div className={styles.listingDetail}>
      <Link to={`/offers/${id}`}>
        <h2>Título: {position}</h2>
        <p>Descripción: {description}</p>
        <p>Empresa: {companyOwner}</p>
        <p>Ciudad: {location}</p>
        <p>
          Modalidad de prácticas: {typeJob} y {internJob}
        </p>
        <p></p>
        {/* DAL - Para adaptarlo el ISO*/}
        {/* <p>Publicado el: {publicationDate.toDateString()}</p> */}
        <p>Publicado el: {publicationDate.toISOString().split('T')[0]}</p>
        <p>
          Número vacantes: {numberVacancies} | Número solicitantes:{' '}
          {numberApplicants}
        </p>
        {/* TODO: Incluir el componente Button en funcion del pefil (company o user) y si el user ha aplicado o no */}
        {/* <Button onClick={() => {}}>Apply Now</Button> */}
      </Link>
    </div>
  );
}
