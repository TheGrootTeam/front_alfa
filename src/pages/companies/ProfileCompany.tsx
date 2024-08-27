//import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
// import styles from "./Profile.module.css";

export function CompanyProfilePage() {
  const { t } = useTranslation();
  //const { id } = useParams();

  const data = {
    name: 'Nombre',
    phone: 'Phone',
    sector: 'Sector',
    location: 'Location',
    description: 'Description',
  }; //DATOS A CAPON - Delete when redux

  const { name, phone, sector, location, description } = data; //useSelector(getCompanyData(id));
  //const offers = useSelector(getCompanyOffers(id));

  return (
    <>
      <Layout title={t('titles.companyprofile')} page="companyprofile">
        <h2>{t('titles.company_public_profile')}</h2>
        <p>
          {t('forms.company')}
          {name}
        </p>
        <p>
          {t('fields.phone')}
          {phone}
        </p>
        <p>
          {t('fields.industry')}
          {sector}
        </p>
        <p>
          {t('fields.location')}
          {location}
        </p>
        <p>
          {t('fields.description')}
          {description}
        </p>
        <h2>{t('titles.company_public_offers')}</h2>
        {/* Añadir componente que lista las ofertas del usuario */}
      </Layout>
    </>
  );
}
