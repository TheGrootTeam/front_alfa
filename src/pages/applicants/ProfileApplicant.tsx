import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import styles from './ProfileApplicant.module.css';

export function UserProfilePage() {
  const { t } = useTranslation();
  return (
    <Layout title={t('titles.userprofile')} page="userprofile">
      <header className={styles.header}>
        <div className={styles.profile__photo}>
          <img src="https://i.pravatar.cc/600" alt="" />
        </div>

        <div className={styles.profile__data}>
          <h2>John Doe</h2>
          <h3>Full Stack Developer</h3>
          <p className={styles.profile__location}>New York</p>
          <a className={styles.profile__downloadCV} href="">
            Download CV
          </a>
        </div>

        {/* edit button if user */}
      </header>

      <section className={styles.profile__details}>
        <div className={styles.profile__skills}>
          <h3>Main skills</h3>
          <ul>
            <li>CSS</li>
            <li>Javascript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>MongoDB</li>
          </ul>
        </div>

        <div className={styles.profile__preferences}>
          <h3>Preferences</h3>
          <dl>
            <dt>Work location</dt> <dd>Full Remote</dd>
            <dt>Internship Type</dt> <dd>All / Any</dd>
          </dl>
        </div>

        <div className={styles.profile__availability}>
          <h3>Availability</h3>
          <dl>
            <dt>Willing to relocate?</dt> <dd>No</dd>
            <dt>Available to start immediately?</dt> <dd>Yes</dd>
          </dl>
        </div>
      </section>
    </Layout>
  );
}
