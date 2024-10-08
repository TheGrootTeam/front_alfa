import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authLogout } from '../../store/actions/authActions';
import { getIsLogged, getIsCompany } from '../../store/selectors';
import { AppDispatch } from '../../store/store';

import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import styles from './Header.module.css';
import ConfirmationButton from '../common/ConfirmationButton';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const auth = useSelector(getIsLogged); // To verify if the user is logged
  const isCompany = useSelector(getIsCompany); //To verify if it is a company
  const dispatch = useDispatch<AppDispatch>();
  // To control the burger menu
  const [menuBurgerOpen, setMenuBurgerOpen] = useState(false);

  const langs: { [key: string]: { nativeName: string } } = {
    es: { nativeName: 'Español' },
    en: { nativeName: 'English' },
  };

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const toggleMenu = () => {
    setMenuBurgerOpen(!menuBurgerOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>
            <Link to={`/`}>
              <Logo className={styles.logo} />
              <span>internIT</span>
            </Link>
          </h1>
          <nav
            className={`${styles.nav} ${menuBurgerOpen ? styles.open : ''} `}
          >
            <ul className={styles.mainNav}>
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
                  <li className={styles.logout}>
                    <ConfirmationButton
                      buttonLabel={t('nav.logout')}
                      dialogText={t('dialogs.logout_message')}
                      confirmLabel={t('gen.yes')}
                      cancelLabel={t('gen.no')}
                      confirmAction={handleLogout}
                    />
                    <span className="material-symbols-outlined">logout</span>
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
                  {i18n.resolvedLanguage !== lang && (
                    <span
                      className={`material-symbols-outlined ${styles.iconLang}`}
                    >
                      sync_alt
                    </span>
                  )}
                  {lang.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            type="button"
          >
            <span className={`material-symbols-outlined ${styles.icon}`}>
              {menuBurgerOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
