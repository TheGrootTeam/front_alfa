import styles from './ApplicantDetail.module.css';
// import { Button } from '../common/Button';

interface ApplicantDetailProps {
  id: number;
  name: string;
  email: string;
  // Agregar más detalles específicos del aplicante en el futuro
}

const ApplicantDetail: React.FC<ApplicantDetailProps> = () => {
  return (
    <div className={styles.applicantDetail}>
      <p>Name: Juan</p>
      <p>Email: Palomo</p>
      {/* <Button onClick={() => {}}>View Profile</Button> */}
    </div>
  );
};

export default ApplicantDetail;
