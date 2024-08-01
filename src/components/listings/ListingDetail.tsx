import styles from './ListingDetail.module.css';
// import { Button } from '../common/Button';

interface ListingProps {
  id: number;
  title: string;
  description: string;
}

const ListingDetail: React.FC<ListingProps> = () => {
  return (
    <div className={styles.listing}>
      <h2>Titulo</h2>
      <p>description</p>
      {/* TODO: Incluir el componente Button en funcion del pefil (company o user) y si el user ha aplicado o no */}
      {/* <Button onClick={() => {}}>Apply Now</Button> */}
    </div>
  );
};

export default ListingDetail;
