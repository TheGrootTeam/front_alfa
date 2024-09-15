import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged, getIsCompany } from '../../store/selectors';
import Layout from '../../components/layout/Layout';
import { useTranslation, Trans } from 'react-i18next';
import styles from './NotFound.module.css';

export function NotFoundPage() {
  const { t } = useTranslation();
  const isLogged = useSelector(getIsLogged); // To verify if the user is logged
  const isCompany = useSelector(getIsCompany); //To verify if it is a company
  const location = useLocation();

  return (
    <>
      <Layout page="notfound" mainClassName="centered">
        <div className={styles.NotFoundContent}>
          <header>
            <h2>
              {t('titles.error404')}{' '}
              <span className={`material-symbols-outlined ${styles.bigIcon}`}>
                cancel
              </span>
            </h2>
            <h3>{t('titles.page_not_found')}</h3>
          </header>
          <section>
            <p>
              <Trans
                i18nKey="errors.404_page"
                values={{ path: location.pathname }}
                components={{ b: <b /> }}
              />
            </p>
            <ul>
              <li>
                <Link to="/">
                  <span
                    className={`material-symbols-outlined ${styles.smallIcon}`}
                  >
                    undo
                  </span>
                  {t('buttons.back_home')}
                </Link>
              </li>
              {isLogged && (
                <li>
                  <Link to={isCompany ? '/company' : '/user'}>
                    <span
                      className={`material-symbols-outlined ${styles.smallIcon}`}
                    >
                      undo
                    </span>
                    {t('buttons.back_dashboard')}
                  </Link>
                </li>
              )}
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
}
