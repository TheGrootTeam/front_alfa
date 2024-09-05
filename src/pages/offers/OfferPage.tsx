import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';
import {
  getOffer,
  getUi,
  getUiSuccess,
  getCompanyInfo,
} from '../../store/selectors';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
//import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import styles from "./Offermodule.css";
import { useDispatch } from 'react-redux';
import { deleteOfferAction } from '../../store/actions/offersActions';
import { AppDispatch } from '../../store/store';
import Notification from '../../components/common/Notification';
import { uiSlice } from '../../store/reducers/uiSlice';
import { getOffersAction } from '../../store/actions/offersActions';

export function OfferPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const offer: IOfferMapped | undefined = useSelector(getOffer(id));
  const { error } = useSelector(getUi);
  const success = useSelector(getUiSuccess);
  const [showConfirm, setShowCofirm] = useState(false);
  //The company owner of the offert
  const companyId = offer?.companyOwner._id;
  //The company loged
  const companyInUse = useSelector(getCompanyInfo);
  const companyLoged = companyInUse.id;
  const ownerOffer = companyId === companyLoged ? true : false;

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

  return (
    <>
      <Layout page="offer">
        {offer ? (
          <>
            <h2>
              {t('forms.position')}: {offer.position}
            </h2>
            <p>
              {t('forms.offer_description')}: {offer.description}
            </p>
            <p>
              {t('forms.company')}:{' '}
              <Link
                to={`/view/company/${companyId}`}
              >{`${offer.companyOwner.name}`}</Link>
            </p>
            <p>
              {t('forms.location')}: {offer.location}
            </p>
            <p>
              {t('forms.job_type')}: {offer.typeJob} y {offer.internJob}
            </p>
            <p>
              {t('forms.publication_date')}:{' '}
              {offer.publicationDate.toISOString().split('T')[0]}
            </p>
            <p>
              {t('forms.number_vacancies')}: {offer.numberVacancies} |{' '}
              {t('forms.number_applicants')}: {offer.numberApplicants}
            </p>
            {ownerOffer && (
              <Button onClick={editOffer}> {t('nav.edit_offer_link')}</Button>
            )}
            &nbsp;
            {showConfirm && (
              <div>
                <p>{t('dialogs.delete_offer_message')}</p>
                <Button onClick={deleteOffer}>{t('buttons.yes_delete')}</Button>
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
          </>
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
