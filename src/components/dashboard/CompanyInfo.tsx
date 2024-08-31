import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { getInfoCompanyAction } from '../../store/actions/infoCompanyActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
//import { getApplicantInfo} from '../../store/selectors';
import { getCompanyInfo } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import styles from './CompanyInfo.module.css';
import Notification from '../common/Notification';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  // const applicant = useSelector(getApplicantInfo);
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
            <p>Email: {company.email}</p>
            <p>Teléfono: {company.phone}</p>
            <p>Description: {company.description}</p>
            <p>Ubicación: {company.ubication}</p>
            <p>Sector: {company.sector.sector}</p>
          </div>
        </div>
        <div>
          <h3>Listado de Ofertas Publicadas</h3>
          <br></br>
          <hr></hr>
          <br></br>
          {company.publishedOffers.map((offer) => (
            <p key={offer._id}>
              {offer.position} - {offer.location} -{' '}
              {offer.status ? '[Activa]' : '[Cerrada]'}
            </p>
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
