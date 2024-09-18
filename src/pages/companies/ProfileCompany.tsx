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
  const logoSRC = `${import.meta.env.VITE_FILE_PATH}/logo/${logo}`;

  return (
    <>
      <Layout title={t('titles.companyprofile')} page="companyprofile">
        {loading && <Loader />}
        {error && (
          <Notification type="error" message={error} onClick={resetError} />
        )}
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.profile__photo}>
              <img src={logoSRC} alt={`Logo ${company}`} />
            </div>

            <div className={styles.profile__data}>
              <h2>{company}</h2>
              <ul>
                <li>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    alternate_email
                  </span>
                  {email}
                </li>
                <li>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    call
                  </span>
                  {phone}
                </li>
                <li>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    domain
                  </span>
                  {sector.sector}
                </li>
                <li>
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall}`}
                  >
                    location_on
                  </span>
                  {ubication}
                </li>
              </ul>
            </div>
          </header>

          <section className={styles.profile__details}>
            <div className={styles.profile__description}>{description}</div>
            <div className={styles.profile__offers}>
              <h3 className={styles.h3}>
                <span
                  className={`material-symbols-outlined ${styles.iconSmall}`}
                >
                  checklist
                </span>
                {t('titles.company_public_offers')}
              </h3>

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
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
