import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { getOffer } from '../../store/selectors';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
// import styles from "./Offermodule.css";

export function OfferPage() {
  const { id } = useParams();

  const offer: IOfferMapped | undefined = useSelector(getOffer(id));

  return (
    <>
      <Layout page="offer">
        {offer ? (
          <>
            <h2>Título: {offer.position}</h2>
            <p>Descripción: {offer.description}</p>
            <p>Empresa: {`${offer.companyOwner}`}</p>
            <p>Ciudad: {offer.location}</p>
            <p>
              Modalidad de prácticas: {offer.typeJob} y {offer.internJob}
            </p>
            <p></p>
            {/* DAL - Para adaptarlo el ISO*/}
            {/* <p>Publicado el: {publicationDate.toDateString()}</p> */}
            <p>
              Publicado el: {offer.publicationDate.toISOString().split('T')[0]}
            </p>
            <p>
              Número vacantes: {offer.numberVacancies} | Número solicitantes:{' '}
              {offer.numberApplicants}
            </p>
            {/* TODO: Incluir el componente Button en funcion del pefil (company o user) y si el user ha aplicado o no */}
            {/* <Button onClick={() => {}}>Apply Now</Button> */}
          </>
        )
      : `Not Found`
      }
      </Layout>
    </>
  );
}
