// import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './ProfileApplicant.module.css';

export function UserProfilePage() {
  const { t } = useTranslation();
  // const { id } = useParams();

  const data = {
    name: 'John',
    lastName: 'Doe',
    wantedRol: ['Full Stack Developer', 'UX/UI Designer'],
    ubication: 'New York',
    cv: '',
    mainSkills: [
      'CSS',
      'Javascript',
      'TypeScript',
      'React',
      'MongoDB',
      'Redux',
      'Figma',
    ],
    typeJob: 'Full Remote',
    internType: 'All / Any',
    geographically_mobile: 'No',
    disponibility: 'Yes',
  }; // DATOS A CAPON - Delete when redux

  const {
    name,
    lastName,
    wantedRol,
    ubication,
    cv,
    mainSkills,
    typeJob,
    internType,
    geographically_mobile,
    disponibility,
  } = data; // useSelector(getApplicantData(id));

  return (
    <Layout title={t('titles.userprofile')} page="userprofile">
      <header className={styles.header}>
        <div className={styles.profile__photo}>
          <img src="https://i.pravatar.cc/600" alt="" />
        </div>

        <div className={styles.profile__data}>
          <h2>
            {name} {lastName}
          </h2>
          <h3>{wantedRol.join(', ')}</h3>
          <p className={styles.profile__location}>{ubication}</p>
          <a className={styles.profile__downloadCV} href={cv}>
            {t('forms.cv_dl_button')}
          </a>
        </div>

        {/* edit button if user */}
      </header>

      <section className={styles.profile__details}>
        <div className={styles.profile__skills}>
          <h3>{t('titles.main_skills')}</h3>
          <ul>
            {mainSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className={styles.profile__preferences}>
          <h3>{t('titles.internship_preferences')}</h3>
          <dl>
            <dt>{t('forms.job_type')}</dt> <dd>{typeJob}</dd>
            <dt>{t('forms.internship_type')}</dt> <dd>{internType}</dd>
          </dl>
        </div>

        <div className={styles.profile__availability}>
          <h3>{t('titles.availability')}</h3>
          <dl>
            <dt>{t('forms.willing_to_relocate')}</dt>
            <dd>{geographically_mobile}</dd>
            <dt>{t('forms.available_immediately')}</dt>
            <dd>{disponibility}</dd>
          </dl>
        </div>
      </section>
    </Layout>
  );
}
