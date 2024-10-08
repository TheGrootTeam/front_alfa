import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getInfoCompanyAction } from '../../store/actions/infoCompanyActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { getCompanyInfo } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import styles from './CompanyInfo.module.css';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';
import { ListDashboardOffersCompany } from '../listings/ListDashboardOffersCompany';
import { deleteProfile } from '../../api/client';
import ConfirmationButton from '../common/ConfirmationButton';
import { authLogout } from '../../store/actions/authActions';
import SuccessDialog from '../common/SuccessDialog';
import ErrorDialog from '../common/ErrorDialog';
import { Loader } from '../common/Loader';
import SearchForm from '../../components/common/SearchForm';
import { SearchResults } from '../../components/common/SearchResults';

// Import the Action RESETCompanyinfostore and Getoffersaction
import { resetCompanyInfoStore } from '../../store/reducers/infoCompanySlice';
import { getOffersAction } from '../../store/actions/offersActions';

// Change the import of notification to avoid conflicts
import { Notification as CustomNotification } from '../common/Notification';

export default function CompanyInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const company = useSelector(getCompanyInfo);
  const { error } = useSelector(getUi);
  const navigate = useNavigate();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getInfoCompanyAction());
  }, [dispatch]);

  // Function to delete the profile and log out the user
  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();

      setShowSuccessDialog(true);

      setTimeout(async () => {
        dispatch(resetCompanyInfoStore());
        await dispatch(getOffersAction());
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
    const logoSRC = `${import.meta.env.VITE_FILE_PATH}/logo/${company.logo}`;
    return (
      <>
        {/* COMPANY PROFILE */}
        <div className={styles.container}>
          <header className={styles.info__header}>
            <div className={styles.profile__photo}>
              <img src={logoSRC} alt={company.logo} />
            </div>
            <h2>{company.name}</h2>
          </header>
          <section className={styles.info__maindetails}>
            <div className={styles.profile__info}>
              <p>
                <span>{t('forms.cif')}:</span> {company.dniCif}
              </p>
              <p>
                <span>{t('forms.email')}:</span> {company.email}
              </p>
              <p>
                <span>{t('forms.phone')}:</span> {company.phone}
              </p>
              <p>
                <span>{t('forms.location')}:</span> {company.ubication}
              </p>
              <p>
                <span>{t('forms.description')}:</span> {company.description}
              </p>
              <p>
                <span>{t('forms.sector')}:</span> {company.sector.sector}
              </p>
            </div>
          </section>
          <section className={styles.buttons}>
            <div className={styles.button}>
              <Link to="/company/edit">
                <Button>{t('buttons.userprofile_edit')}</Button>
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

        {/* LISTINGS ETC */}
        <div className={styles.offersResults}>
          <SearchForm />
          <SearchResults />
          <h3 className={styles.h3}>{t('titles.published_offers')}</h3>
          <ListDashboardOffersCompany
            publishedOffers={company.publishedOffers}
          />
        </div>
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
          {error && (
            <CustomNotification
              type="error"
              message={error}
              onClick={resetError}
            />
          )}
          {showInfo()}
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
      )}
    </>
  );
}
