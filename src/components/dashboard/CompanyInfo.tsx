import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getInfoCompanyAction } from '../../store/actions/infoCompanyActions';
import { AppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
//import { getToUpdateOfferState } from '../../store/selectors';
import { getCompanyInfo } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import styles from './CompanyInfo.module.css';
import Notification from '../common/Notification';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';
import { ListDashboardOffersCompany } from '../listings/ListDashboardOffersCompany';

export default function CompanyInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const company = useSelector(getCompanyInfo);
  const { error } = useSelector(getUi);

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
              <Button>{t('buttons.userprofile_edit')}</Button>
            </Link>
          </div>
          <div className={styles.button}>
            <Link to="">
              <Button>{t('buttons.userprofile_delete')}</Button>
            </Link>
          </div>
        </div>
        <div>
          <hr></hr>
          <h2>{t('titles.published_offers')}</h2>
          <hr></hr>
          <br></br>
          <ListDashboardOffersCompany
            publishedOffers={company.publishedOffers}
          />
        </div>
      </>
    );
  }

  function showError() {
    return <Notification type="error" message={error} onClick={resetError} />;
  }

  return <>{error ? showError() : showInfo()}</>;
}
