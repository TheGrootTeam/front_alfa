import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { authLogout } from '../../store/actions/authActions';
import { getIsLogged, getIsCompany } from '../../store/selectors';
import { AppDispatch } from '../../store/store';

import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import styles from './Header.module.css';
import ConfirmationButton from '../common/ConfirmationButton';

import { useTranslation } from 'react-i18next';

// interface HeaderProps {
//   userId: string;
// }

const Header = () => {
  const { t, i18n } = useTranslation();
  const { error } = useSelector(getUi);
  const auth = useSelector(getIsLogged); // To verify if the user is logged
  const isCompany = useSelector(getIsCompany); //To verify if it is a company
  // const loggedInUser = '66c6fc21a5c2d7c86aa0aa0e';
  const dispatch = useDispatch<AppDispatch>();

  const langs: { [key: string]: { nativeName: string } } = {
    es: { nativeName: 'Español' },
    en: { nativeName: 'English' },
  };

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  return (
    <>
      <div className={styles.headerError} onClick={resetError}>
        {error ? error : null}
      </div>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>
            <Link to={`/`}>
              <Logo className={styles.icon} /> <span>InternIT</span>
            </Link>
          </h1>
          <nav className={styles.nav}>
            <ul>
              {auth ? (
                // When the user is authenticated
                <>
                  <li>
                    <Link to="/about">{t('nav.about')}</Link>
                  </li>
                  {!isCompany && (
                    <li>
                      <Link to="/user">{t('titles.dashboard')}</Link>
                    </li>
                  )}
                  {isCompany && (
                    <>
                      <li>
                        <Link to="/company">{t('titles.dashboard')}</Link>
                      </li>
                      <li>
                        <Link to="/offers/new">{t('nav.add_new_offer')}</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <ConfirmationButton
                      buttonLabel={t('nav.logout')}
                      dialogText={t('dialogs.logout_message')}
                      confirmLabel={t('gen.yes')}
                      cancelLabel={t('gen.no')}
                      confirmAction={handleLogout}
                    />
                  </li>
                </>
              ) : (
                // When the user is not authenticated
                <>
                  <li>
                    <Link to="/login">{t('nav.log_in')}</Link>
                  </li>
                  <li>
                    <Link to="/register">{t('nav.register')}</Link>
                  </li>
                  <li>
                    <Link to="/about">{t('nav.about')}</Link>
                  </li>

                  {/* MARTA - TEMPORAL porque si no no puedo ver la página */}
                  {/* <li>
                    <Link to={`/view/user/${loggedInUser}`}>Profile</Link>
                  </li> */}
                </>
              )}
            </ul>
          </nav>
          <ul className={styles.languageSwitcher}>
            {Object.keys(langs).map((lang) => (
              <li key={lang}>
                <button
                  type="submit"
                  onClick={() => i18n.changeLanguage(lang)}
                  disabled={i18n.resolvedLanguage === lang}
                >
                  {lang.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
