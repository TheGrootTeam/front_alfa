import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { IOfferListingDetail } from '../../utils/interfaces/IOffer';
import styles from './ListingDetail.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import ContactForm from '../forms/ContactForm';
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
  // const formattedDate = new Date(publicationDate).toLocaleDateString('es-ES', {
  //   day: '2-digit',
  //   month: '2-digit',
  //   year: 'numeric',
  // });

  const { t } = useTranslation();

  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        <p>{description}</p>
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

      {/* Botón para abrir el modal */}
      <Button onClick={handleOpenModal} className={styles.contactButton}>
        Contactar a la Empresa
      </Button>

      {/* Modal para el formulario de contacto */}
      <ContactForm
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        companyId={companyOwner._id}  // Pasar el ID de la empresa para obtener su email
        offerName={position}  // Asunto del email: la posición de la oferta
      />


      {/* TODO: Incluir el componente Button en funcion del pefil (company o user) y si el user ha aplicado o no */}
      {/* <Button onClick={() => {}}>Apply Now</Button> */}
    </div>
  );
}
