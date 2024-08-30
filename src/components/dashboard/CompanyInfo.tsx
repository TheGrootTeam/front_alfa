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
import Notification from '../common/Notification';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  // const applicant = useSelector(getApplicantInfo);
  const company = useSelector(getCompanyInfo);
  const { error } = useSelector(getUi);

  useEffect(() => {
    //dispatch(getInfoApplicantAction());
    dispatch(getInfoCompanyAction);
  }, [dispatch]);

  const offers = [
    { id: 1, titulo: 'Software Engineer' },
    { id: 2, titulo: 'Product Manager' },
    { id: 3, titulo: 'Data Scientist' },
  ];

  function showInfo() {
    return (
      <>
        <div>
          {/* <img src="" alt={applicant.photo} />
          <h3>Nombre: {`${applicant.name} ${applicant.lastName}`}</h3>
          <p>Email: {applicant.email}</p>
          <p>Teléfono: {applicant.phone}</p>
          <p>Ciudad: {applicant.ubication} </p>
          <p>Modalidad: {`${applicant.typeJob} & ${applicant.internType}`}</p> */}

          <img src="" alt={company.logo} />
          <h3>Nombre: {company.name}</h3>
          <p>Email: {company.email}</p>
          <p>Teléfono: {company.phone}</p>
          <p>Description: {company.description}</p>
          <p>Ubicación: {company.ubication}</p>
          <p>Sector: {company.sector.sector}</p>

          <img src="" alt="logo" />
          <h3>Nombre: Apple</h3>
          <p>Email: apple@mail.com</p>
          <p>Teléfono: 666 666 666</p>
          <p>Description: Hoy los móviles, mañana el mundo</p>
          <p>Ciudad: The Hell</p>
          <p>Sector: Populate de Sector</p>
        </div>
        <div>
          <h3>Listado de Ofertas Publicadas</h3>

          {company.pusblishedOffers.map((offer) => (
            <p key={offer._id}>
              {offer.position} -{' '}
              {offer.status ? 'Oferta Activa' : 'Oferta Cerrada'}
            </p>
          ))}

          {/* {loading  ? (
            <p>Cargando ofertas...</p>
          ) : (
            offers.map((oferta) => <p key={oferta.id}>{oferta.titulo}</p>)
          )} */}
          <hr></hr>
          {offers.map((oferta) => (
            <p key={oferta.id}>{oferta.titulo}</p>
          ))}
        </div>
      </>
    );
  }

  // const resetError = () => {
  //   dispatch(uiSlice.actions.resetError());
  // };

  function showError() {
    //return <Notification type="error" message={error} onClick={resetError} />;
    return <Notification type="error" message={error} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
