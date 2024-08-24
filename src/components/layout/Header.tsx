import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { authLogout } from '../../store/actions/authActions';
import { getIsLogged, getIsCompany } from '../../store/selectors'; // Añadir getIsCompany
import { AppDispatch } from '../../store/store';

import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import styles from './Header.module.css';
import ConfirmationButton from '../common/ConfirmationButton';

import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { error } = useSelector(getUi);
  const auth = useSelector(getIsLogged); // Para verificar si el usuario está logado
  const isCompany = useSelector(getIsCompany); // Para verificar si es una empresa
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
      <div onClick={resetError}>{error ? error : null}</div>
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
                // Cuando el usuario está autenticado
                <>
                  <li>
                    <Link to="/about">{t('nav.about')}</Link>
                  </li>
                  {isCompany && (
                    <li>
                      <Link to="/offers/new">{t('nav.add_new_offer')}</Link>
                    </li>
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
                // Cuando el usuario no está autenticado
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
