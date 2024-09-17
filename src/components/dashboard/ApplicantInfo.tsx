import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoApplicantAction } from '../../store/actions/infoApplicantActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getApplicantInfo, getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ApplicantInfo.module.css';
import { deleteProfile } from '../../api/client';
import ConfirmationButton from '../common/ConfirmationButton';
import { authLogout } from '../../store/actions/authActions';
import SuccessDialog from '../common/SuccessDialog';
import ErrorDialog from '../common/ErrorDialog';
import { Loader } from '../common/Loader';

// Change the import of notification to avoid conflicts
import { Notification as CustomNotification } from '../common/Notification';

export default function ApplicantInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const applicant = useSelector(getApplicantInfo);
  const { error } = useSelector(getUi);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getInfoApplicantAction());
  }, [dispatch]);

  // Function to delete the profile and log out the user
  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();

      setShowSuccessDialog(true);

      setTimeout(() => {
        setLoading(true);

        setTimeout(() => {
          navigate('/');

          setTimeout(() => {
            dispatch(authLogout());
          }, 500);
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setShowErrorDialog(true);
    }
  };

  function showInfo() {
    return (
      <>
        <div className={styles.container}>
          <header className={styles.info__header}>
            <div className={styles.profile__photo}>
              <img
                src="https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160911129/62789324-avatar-cara-hombre-dibujos-animados-hombre-persona-ilustraci%C3%B3n-vectorial.jpg"
                alt={applicant.photo}
              />
            </div>
            <h2>{`${applicant.name} ${applicant.lastName}`}</h2>
          </header>
          <section className={styles.info__maindetails}>
            <div className={styles.profile__info}>
              <p>
                <span>{t('forms.nif')}:</span> {applicant.dniCif}
              </p>
              <p>
                <span>{t('forms.email')}:</span> {applicant.email}
              </p>
              <p>
                <span>{t('forms.phone')}:</span> {applicant.phone}
              </p>
              <p>
                <span>{t('forms.location')}:</span> {applicant.ubication}
              </p>
              <p>
                <span>{t('forms.internship_type')}:</span>{' '}
                {`${applicant.typeJob} & ${applicant.internType}`}
              </p>
              <div>
                <span>{t('forms.mainSkills')}:</span>
                <ul>
                  {applicant.mainSkills.map((skill) => (
                    <li key={skill._id}>{skill.skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span>{t('forms.wantedRole')}:</span>
                <ul>
                  {applicant.wantedRol.map((rol) => (
                    <li key={rol._id}>{rol.rol}</li>
                  ))}
                </ul>
              </div>
              <p>
                <span>{t('forms.cv')}:</span> {applicant.cv}
              </p>
              <p>
                <span>{t('forms.willing_to_relocate')}:</span>{' '}
                {applicant.geographically_mobile ? t('gen.yes') : t('gen.no')}
              </p>
            </div>
          </section>
          <section className={styles.buttons}>
            <div className={styles.button}>
              <Link to="/user/edit">
                <Button>{t('titles.userprofile_edit')}</Button>
              </Link>
            </div>
            <div className={styles.button}>
              <ConfirmationButton
                buttonLabel={t('buttons.userprofile_delete')}
                dialogText={t('dialogs.confirm_delete_profile')}
                confirmLabel={t('buttons.yes_delete')}
                cancelLabel={t('buttons.no_cancel')}
                confirmAction={handleDeleteProfile}
              />
            </div>
          </section>
        </div>

        {showSuccessDialog && (
          <SuccessDialog
            message={t('success.profile_deleted')}
            onClose={() => setShowSuccessDialog(false)}
          />
        )}

        {showErrorDialog && (
          <ErrorDialog
            message={t('errors.generic_form_error')}
            onClose={() => setShowErrorDialog(false)}
          />
        )}
      </>
    );
  }

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <CustomNotification
              type="error"
              message={error}
              onClick={resetError}
            />
          ) : (
            showInfo()
          )}
        </>
      )}
    </>
  );
}
