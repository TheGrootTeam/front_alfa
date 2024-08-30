import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { getOffer } from '../../store/selectors';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { Button } from '../../components/common/Button';
import { useState } from 'react';
//import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import styles from "./Offermodule.css";

export function OfferPage() {
  const { t } = useTranslation();
  //const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const offer: IOfferMapped | undefined = useSelector(getOffer(id));
  const [showConfirm, setShowCofirm] = useState(false);

  const deleteOffer = () => {
    //DELETE AD
  };

  const editOffer = async () => {
    if (offer) {
      navigate(`/offers/edit`, { state: { offer } });
    }
  };

  // useEffect(() => {
  //   //dispatch(getOfferAction(id));
  // }, [id, dispatch]);

  return (
    <>
      <Layout page="offer">
        {offer ? (
          <>
            <h2>{t('forms.position')}: {offer.position}</h2>
            <p>{t('forms.offer_description')}: {offer.description}</p>
            <p>{t('forms.company')}: {`${offer.companyOwner.name}`}</p>
            <p>{t('forms.location')}: {offer.location}</p>
            <p>
            {t('forms.job_type')}: {offer.typeJob} y {offer.internJob}
            </p>
            <p>
            {t('forms.publication_date')}: {offer.publicationDate.toISOString().split('T')[0]}
            </p>
            <p>
            {t('forms.number_vacancies')}: {offer.numberVacancies} | {t('forms.nnumber_applicants')}:{' '}
              {offer.numberApplicants}
            </p>
            <Button onClick={editOffer}> {t('nav.edit_offer_link')}</Button>
            &nbsp;
            {showConfirm && (
              <div>
                <p>{t("forms.delete_offer_message")}</p>
                <Button onClick={deleteOffer}>{t('buttons.yes_delete')}</Button>
                <Button onClick={() => setShowCofirm(false)}>{t('buttons.no_cancel')}</Button>
              </div>
            )}
            {!showConfirm && (
              <Button onClick={() => setShowCofirm(true)}>{t('buttons.delete_offer')}</Button>
            )}
          </>
        ) : (
          `Not Found`
        )}
      </Layout>
    </>
  );
}
