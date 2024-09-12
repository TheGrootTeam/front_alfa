import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { uiSlice } from '../../store/reducers/uiSlice';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { getPublicApplicantInfo } from '../../utils/services/publicProfileService';
import { IApplicantPublicProfileMapped } from '../../utils/interfaces/IProfile';
import { Loader } from '../../components/common/Loader';
import Notification from '../../components/common/Notification';
import styles from './ProfileApplicant.module.css';

export function UserProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(getUi);

  // http://localhost:5173/view/applicant/66c6fc21a5c2d7c86aa0aa0e
  // 66c6fc21a5c2d7c86aa0aa0e

  const [data, setData] = useState<IApplicantPublicProfileMapped>({
    name: '',
    lastName: '',
    email: '',
    wantedRol: [],
    ubication: '',
    cv: '',
    skills: [],
    jobType: '',
    internType: '',
    mobility: false,
    disponibility: false,
  });

  const {
    name,
    lastName,
    // email,
    wantedRol,
    ubication,
    cv,
    skills,
    jobType,
    internType,
    mobility,
    disponibility,
  } = data;

  useEffect(() => {
    async function getData() {
      try {
        const data: any = await getPublicApplicantInfo(id, 'applicant');
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
    <Layout title={t('titles.userprofile')} page="userprofile">
      {loading && <Loader />}
      {error && (
        <Notification type="error" message={error} onClick={resetError} />
      )}
      <header className={styles.header}>
        <div className={styles.profile__photo}>
          <img src="https://i.pravatar.cc/600" alt="" />
        </div>

        <div className={styles.profile__data}>
          <h2>
            {name} {lastName}
          </h2>
          <h3>{wantedRol.map((item) => item.rol).join(', ')}</h3>
          <p className={styles.profile__location}>
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              location_on
            </span>
            {ubication}
          </p>
          <a className={styles.profile__downloadCV} href={cv}>
            {t('forms.cv_dl_button')}
          </a>
        </div>

        {/* edit button if user */}
      </header>

      <section className={styles.profile__details}>
        <div className={styles.profile__skills}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconh3}`}>
              manufacturing
            </span>
            {t('titles.main_skills')}
          </h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className={styles.profile__preferences}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconh3}`}>
              work
            </span>
            {t('titles.internship_preferences')}
          </h3>
          <dl>
            <dt>{t('forms.job_type')}</dt> <dd>{jobType}</dd>
            <dt>{t('forms.internship_type')}</dt> <dd>{internType}</dd>
          </dl>
        </div>

        <div className={styles.profile__availability}>
          <h3>
            <span className={`material-symbols-outlined ${styles.iconh3}`}>
              check_circle
            </span>
            {t('titles.availability')}
          </h3>
          <dl>
            <dt>{t('forms.willing_to_relocate')}</dt>
            <dd>{mobility ? t('gen.yes') : t('gen.no')}</dd>
            <dt>{t('forms.available_immediately')}</dt>
            <dd>{disponibility ? t('gen.yes') : t('gen.no')}</dd>
          </dl>
        </div>
      </section>
    </Layout>
  );
}
