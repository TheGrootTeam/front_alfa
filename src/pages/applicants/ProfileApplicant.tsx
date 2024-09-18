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
    photo: '',
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
    photo,
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

  const photoSRC =
    `${import.meta.env.VITE_FILE_PATH}/photo/${photo}` ||
    `${import.meta.env.VITE_DEFAULT_FILE_URL}`;
  const cvSRC =
    `${import.meta.env.VITE_FILE_PATH}/cv/${cv}` ||
    `${import.meta.env.VITE_DEFAULT_FILE_URL}`;

  return (
    <Layout title={t('titles.userprofile')} page="userprofile">
      {loading && <Loader />}
      {error && (
        <Notification type="error" message={error} onClick={resetError} />
      )}
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.profile__photo}>
            <img src={photoSRC} alt="" />
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
            <a className={styles.profile__downloadCV} href={cvSRC}>
              <span className={`material-symbols-outlined ${styles.iconSmall}`}>
                download
              </span>
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
            <ul>
              <li>
                <strong>{t('forms.job_type')}</strong> {jobType}
              </li>
              <li>
                <strong>{t('forms.internship_type')}</strong> {internType}
              </li>
            </ul>
          </div>

          <div className={styles.profile__availability}>
            <h3>
              <span className={`material-symbols-outlined ${styles.iconh3}`}>
                check_circle
              </span>
              {t('titles.availability')}
            </h3>
            <ul>
              <li>
                <strong>{t('forms.willing_to_relocate')}</strong>
                {mobility ? t('gen.yes') : t('gen.no')}
              </li>
              <li>
                <strong>{t('forms.available_immediately')}</strong>
                {disponibility ? t('gen.yes') : t('gen.no')}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}
