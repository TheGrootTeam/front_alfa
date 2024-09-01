import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { getInfoCompanyAction } from '../../store/actions/infoCompanyActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getToUpdateOfferState, getUi } from '../../store/selectors';
//import { getApplicantInfo} from '../../store/selectors';
import { getCompanyInfo } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import styles from './CompanyInfo.module.css';
import Notification from '../common/Notification';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  // const applicant = useSelector(getApplicantInfo);
  const { t } = useTranslation();
  const company = useSelector(getCompanyInfo);
  const { error } = useSelector(getUi);

  //BALIZA
  console.log('COMPANY INFO : ', company);

  useEffect(() => {
    dispatch(getInfoCompanyAction());
  }, [dispatch]);

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function showInfo() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.profile__photo}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Logo-imperio-gal%C3%A1ctico.png"
              alt={company.logo}
            />
          </div>
          <div className={styles.profile__info}>
            <p></p>
            <h2>Nombre: {company.name}</h2>
          </div>
          <div className={styles.profile__info}>
            <p>
              <span>{t('forms.nif')}:</span> {company.dniCif}
            </p>
            <p>
              <span>{t('fields.email')}:</span> {company.email}
            </p>
            <p>
              <span>{t('fields.phone')}:</span> {company.phone}
            </p>
            <p>
              <span>{t('fields.location')}:</span> {company.ubication}
            </p>
            <p>
              <span>{t('fields.description')}:</span> {company.description}
            </p>
            <p>
              <span>{t('fields.sector')}</span> {company.sector.sector}
            </p>
          </div>
          <div className={styles.button}>
            <Link to="/company/edit">
              {/* <Button>{t('titles.userprofile_edit')}</Button> */}
              <Button>Editar</Button>
            </Link>
          </div>
        </div>
        <div>
          <hr></hr>
          <h2>{t('titles.published_offers')}</h2>
          <hr></hr>
          <br></br>
          {company.publishedOffers.map((offer) => (
            <div className={styles.offer_list} key={offer._id}>
              <Link to={`/offers/${offer._id}`}>
                <h3>{offer.position}</h3>
                <p>
                  {offer.location} -{' '}
                  {offer.status ? (
                    'Oferta Activa'
                  ) : (
                    // <span className="disabled">Oferta Cerrada</span>
                    <span className={styles.disabled}>Oferta Cerrada</span>
                  )}
                </p>
              </Link>
              <p>[ Editar ] - [ Eliminar ]</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
