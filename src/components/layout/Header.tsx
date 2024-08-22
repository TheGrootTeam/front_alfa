import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { authLogout } from '../../store/actions/authActions';
import { getIsLogged } from '../../store/selectors';
import { AppDispatch } from '../../store/store';

import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import styles from './Header.module.css';
import ConfirmationButton from '../common/ConfirmationButton';

import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { error } = useSelector(getUi);
  const { auth } = useSelector(getIsLogged);
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
              {!auth && (
                <>
                  <li>
                    <Link to="/login">{t('nav.log_in')}</Link>
                  </li>
                  <li>
                    <Link to="/register">{t('nav.register')}</Link>
                  </li>
                </>
              )}

              {/* DAL */}
              {/* !auth para darle visibilidad de manera temporal: no me funciona el login*/}
              {!auth && (
                <>
                  <li>
                    <Link to="/offers/new">{t('nav.add_new_offer')}</Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/about">{t('nav.about')}</Link>
              </li>
              {auth && (
                <li>
                  <ConfirmationButton
                    buttonLabel={t('nav.logout')}
                    dialogText={t('dialogs.logout_message')}
                    confirmLabel={t('gen.yes')}
                    cancelLabel={t('gen.no')}
                    confirmAction={handleLogout}
                  />
                </li>
              )}
            </ul>
          </nav>
          <ul className={styles.languageSwitcher}>
            {Object.keys(langs).map((lang) => (
              <li>
                <button
                  type="submit"
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  disabled={i18n.resolvedLanguage === lang}
                >
                  {/* {langs[lang].nativeName} */}
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
