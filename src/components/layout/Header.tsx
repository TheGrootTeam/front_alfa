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

const Header = () => {
  const { error } = useSelector(getUi);
  const { auth } = useSelector(getIsLogged);
  const dispatch = useDispatch<AppDispatch>();

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
              <Logo className={styles.icon} /> <span>The Alpha Project</span>
            </Link>
          </h1>
          <nav className={styles.nav}>
            <ul>
              {!auth && (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/about">About</Link>
              </li>
              {auth && (
                <li>
                  <ConfirmationButton
                    buttonLabel="Log Out"
                    dialogText="Are you sure you want to log out?"
                    confirmLabel="Yes"
                    cancelLabel="No"
                    confirmAction={handleLogout}
                  />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
