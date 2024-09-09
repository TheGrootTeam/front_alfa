import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { uiSlice } from '../../store/reducers/uiSlice';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { Loader } from '../../components/common/Loader';
import Notification from '../../components/common/Notification';
import { ListingDetail } from '../../components/listings/ListingDetail';
import { getPublicInfo } from '../../utils/services/publicProfileService';
import { ICompanyPublicProfileMapped } from '../../utils/interfaces/IProfile';
import styles from './ProfileCompany.module.css';

export function CompanyProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(getUi);

  const [data, setData] = useState<ICompanyPublicProfileMapped>({
    company: '',
    email: '',
    phone: '',
    sector: { sector: '' },
    ubication: '',
    description: '',
    logo: '',
    offers: [],
  });

  const {
    company,
    email,
    phone,
    sector,
    ubication,
    description,
    logo,
    offers,
  } = data;

  useEffect(() => {
    async function getData() {
      try {
        const data: any = await getPublicInfo(id, 'company');
        setData(data);
      } catch (error: any) {
        dispatch(uiSlice.actions.setError(error.error));
      }
    }
    getData();
  }, [id, dispatch]);

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  return (
    <>
      <Layout title={t('titles.companyprofile')} page="companyprofile">
        {loading && <Loader />}
        {error && (
          <Notification type="error" message={error} onClick={resetError} />
        )}
        <div>
          <img src={logo} alt={`Logo ${company}`} />
        </div>
        <h2>{t('titles.company_public_profile')}</h2>
        <p>{`${t('forms.company')}: ${company}`}</p>
        <p>{`${t('forms.email')}: ${email}`}</p>
        <p>{`${t('forms.phone')}: ${phone}`}</p>
        <p>{`${t('forms.industry')}: ${sector.sector}`}</p>
        <p>{`${t('forms.location')}: ${ubication}`}</p>
        <p>{`${t('forms.description')}: ${description}`}</p>
        <h2>{t('titles.company_public_offers')}</h2>

        {offers && offers.length > 0 ? (
          <div className={styles.offersList}>
            {offers.map((offer) => (
              <div key={offer._id}>
                <ListingDetail
                  id={offer._id}
                  companyOwner={offer.companyOwner}
                  description={offer.description}
                  internJob={offer.internJob}
                  location={offer.location}
                  numberApplicants={offer.numberApplicants}
                  numberVacancies={offer.numberVacancies}
                  publicationDate={offer.publicationDate} // Convertir de vuelta a Date si es necesario
                  position={offer.position}
                  status={offer.status}
                  typeJob={offer.typeJob}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>{t('No offers available')}</p>
        )}
      </Layout>
    </>
  );
}
