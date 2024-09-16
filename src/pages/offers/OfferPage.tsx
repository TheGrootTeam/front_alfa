import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';
import {
  getOffer,
  getUi,
  getUiSuccess,
  getCompanyInfo,
  getIsLogged,
  getApplicantInfo,
} from '../../store/selectors';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Offer.module.css';
import { useDispatch } from 'react-redux';
import { deleteOfferAction } from '../../store/actions/offersActions';
import { AppDispatch } from '../../store/store';
import Notification from '../../components/common/Notification';
import { uiSlice } from '../../store/reducers/uiSlice';
import { getOffersAction } from '../../store/actions/offersActions';
import ContactForm from '../../components/forms/ContactForm'; // Importar ContactForm

export function OfferPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const offer: IOfferMapped | undefined = useSelector(getOffer(id));
  const { error } = useSelector(getUi);
  const success = useSelector(getUiSuccess);
  const [showConfirm, setShowCofirm] = useState(false);
  const isLogged = useSelector(getIsLogged);
  const applicantInfo = useSelector(getApplicantInfo);
  const applicantEmail = applicantInfo?.email || '';
  const applicantId = applicantInfo?.id || '';
  const applicantName = applicantInfo?.name || '';
  const applicantLastName = applicantInfo?.lastName || '';

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de contacto

  //The company owner of the offer
  const companyId = offer?.companyOwner._id;
  //The company logged in
  const companyInUse = useSelector(getCompanyInfo);
  const companyLoged = companyInUse.id;
  const ownerOffer = companyId === companyLoged ? true : false;

  // To choose the icon for 'typeJob'
  const getJobLocation = (typeJob: string) => {
    if (typeJob === 'Remoto') return 'location_away';
    if (typeJob === 'Presencial') return 'domain';
    return 'work';
  };

  // To choose the icon for 'internJob'
  const getInternshipType = (internJob: string) => {
    if (internJob === 'Remunerado') return 'paid';
    if (internJob === 'Voluntariado/ONG') return 'volunteer_activism';
    return 'money_off';
  };

  const deleteOffer = () => {
    if (id) {
      const successMessage = t('success.delete_offer_success');
      dispatch(deleteOfferAction({ id, successMessage }));
    }
  };

  const editOffer = async () => {
    if (offer) {
      navigate(`/offers/edit`, { state: { offer } });
    }
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  function showSuccess() {
    return <Notification type="success" message={success} />;
  }

  useEffect(() => {
    dispatch(getOffersAction());
  }, [dispatch]);

  const handleCloseModal = () => setIsModalOpen(false); // Cerrar el modal

  const handleOpenModal = () => {
    if (!isLogged) {
      // Si no está logueado, redirigir al login
      navigate('/login');
    } else {
      // Si está logueado, abrir el modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Layout page="offer">
        {offer ? (
          <article className={styles.offerArticle}>
            <header className={styles.offerHeader}>
              <h2>
                <span
                  className={`material-symbols-outlined ${styles.iconSmall}`}
                >
                  laptop_chromebook
                </span>
                {offer.position}
              </h2>
              <h3>
                <span
                  className={`material-symbols-outlined ${styles.iconSmall}`}
                >
                  domain
                </span>
                <Link to={`/view/company/${companyId}`}>
                  {`${offer.companyOwner.name}`}
                </Link>
              </h3>
            </header>
            <section className={styles.offerContent}>
              <div className={styles.offerDetails}>
                <ul>
                  <li>
                    <span
                      className={`material-symbols-outlined ${styles.iconSmall}`}
                    >
                      event
                    </span>
                    {t('gen.published_on')}{' '}
                    {offer.publicationDate.toISOString().split('T')[0]}
                  </li>
                  <li>
                    <span
                      className={`material-symbols-outlined ${styles.iconSmall}`}
                    >
                      location_on
                    </span>
                    {offer.location}
                  </li>
                  <li>
                    <span
                      className={`material-symbols-outlined ${styles.iconSmall}`}
                    >
                      {getJobLocation(offer.typeJob)}
                    </span>
                    {offer.typeJob}
                  </li>
                  <li>
                    <span
                      className={`material-symbols-outlined ${styles.iconSmall}`}
                    >
                      {getInternshipType(offer.internJob)}
                    </span>
                    {offer.internJob}
                  </li>
                </ul>
              </div>
              <div className={styles.offerDescription}>
                <p className={styles.numVacantes}>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    group
                  </span>
                  {t('forms.number_vacancies')}: {offer.numberVacancies}
                </p>
                <div>{offer.description}</div>
                <div className={styles.offerOptions}>
                  {ownerOffer && (
                    <Button onClick={editOffer}>
                      {t('nav.edit_offer_link')}
                    </Button>
                  )}
                  &nbsp;
                  {showConfirm && (
                    <div>
                      <p>{t('dialogs.delete_offer_message')}</p>
                      <Button onClick={deleteOffer}>
                        {t('buttons.yes_delete')}
                      </Button>
                      <Button onClick={() => setShowCofirm(false)}>
                        {t('buttons.no_cancel')}
                      </Button>
                    </div>
                  )}
                  {!showConfirm && ownerOffer && (
                    <Button onClick={() => setShowCofirm(true)}>
                      {t('buttons.delete_offer')}
                    </Button>
                  )}
                  {/* Añadir el botón para contactar con la empresa */}
                  {!ownerOffer && isLogged && (
                    <>
                      <Button
                        onClick={handleOpenModal}
                        className={styles.contactButton}
                      >
                        {t('buttons.mail_contact_company')}
                      </Button>

                      {/* Modal de contacto */}
                      <ContactForm
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        companyId={companyId || ''}
                        offerName={offer.position}
                        applicantEmail={applicantEmail}
                        applicantId={applicantId}
                        applicantName={applicantName}
                        applicantLastName={applicantLastName}
                      />
                    </>
                  )}
                </div>
              </div>
            </section>
          </article>
        ) : success ? (
          showSuccess()
        ) : (
          'NOT FOUND'
        )}

        {error && showError()}
      </Layout>
    </>
  );
}
