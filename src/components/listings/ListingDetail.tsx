import { Link } from 'react-router-dom';
import { IOfferListingDetail } from '../../utils/interfaces/IOffer';
import styles from './ListingDetail.module.css';
// import { Button } from '../common/Button';

export function ListingDetail({
  id,
  companyOwner,
  description,
  numberApplicants,
  numberVacancies,
  position,
}: IOfferListingDetail) {
  return (
    <div className={styles.listing}>
      <Link to={`/offers/${id}`}>
        <h2>{position}</h2>
        <p>{description}</p>
        <p>{companyOwner}</p>
        <p>{numberApplicants}</p>
        <p>{numberVacancies}</p>
        {/* TODO: Incluir el componente Button en funcion del pefil (company o user) y si el user ha aplicado o no */}
        {/* <Button onClick={() => {}}>Apply Now</Button> */}
      </Link>
    </div>
  );
}
