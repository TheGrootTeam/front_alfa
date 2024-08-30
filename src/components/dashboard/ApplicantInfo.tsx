import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getApplicantInfo, getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import Notification from '../common/Notification';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import styles from './ApplicantInfo.module.css';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector(getApplicantInfo);
  const { error } = useSelector(getUi);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getInfoApplicantAction());
  }, [dispatch]);

  function showInfo() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.profile__photo}>
            <img
              src="https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160911129/62789324-avatar-cara-hombre-dibujos-animados-hombre-persona-ilustraci%C3%B3n-vectorial.jpg"
              alt={applicant.photo}
            />
          </div>
          <h2>{`${applicant.name} ${applicant.lastName}`}</h2>
          <div className={styles.profile__info}>
            <p>
              <span>{t('fields.email')}:</span> {applicant.email}
            </p>
            <p>
              <span>{t('fields.phone')}:</span> {applicant.phone}
            </p>
            <p>
              <span>{t('fields.location')}:</span> {applicant.ubication}
            </p>
            <p>
              <span>{t('forms.internship_type')}:</span>{' '}
              {`${applicant.typeJob} & ${applicant.internType}`}
            </p>
          </div>
          <div className={styles.button}>
            <Link to="/user/edit">
              <Button>{t('titles.userprofile_edit')}</Button>
            </Link>
          </div>
        </div>
      </>
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
