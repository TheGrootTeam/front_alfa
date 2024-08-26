import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getApplicantInfo, getUi } from '../../store/selectors';
import { Loader } from '../common/Loader';
import { uiSlice } from '../../store/reducers/uiSlice';
import Notification from '../common/Notification';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector(getApplicantInfo);
  const { loading, error } = useSelector(getUi);

  useEffect(() => {
    dispatch(getInfoApplicantAction());
  }, [dispatch]);

  function showInfo() {
    return (
      <div>
        <img src="" alt={applicant.photo} />
        <h3>Nombre: {`${applicant.name} ${applicant.lastName}`}</h3>
        <p>Email: {applicant.email}</p>
        <p>Teléfono: {applicant.phone}</p>
        <p>Ciudad: {applicant.ubication} </p>
        <p>Modalidad: {`${applicant.typeJob} & ${applicant.internType}`}</p>
      </div>
    );
  }

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
