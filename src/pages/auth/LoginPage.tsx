import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import styles from './Login.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';
import { uiSlice } from '../../store/reducers/uiSlice';
import { authLogin } from '../../store/actions/authActions';
import { Button } from '../../components/common/Button';
import { AppDispatch } from '../../store/store';
import Notification from '../../components/common/Notification';
import { Loader } from '../../components/common/Loader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const { t } = useTranslation();
  const { loading, error } = useSelector(getUi);

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    dniCif: '',
    password: '',
    rememberMe: false,
  });

  const { dniCif, password, rememberMe } = formData;

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authLogin(formData));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  const resetError = () => {
    dispatch(uiSlice.actions.resetError());
  };

  return (
    <Layout title={t('titles.log_in')} page="loginPage">
      {loading && <Loader />}
      {error && (
        <div className={styles.errorMessage}>
          <Notification type="error" message={error} onClick={resetError} />
        </div>
      )}
      <form onSubmit={handleSubmit} id="login-form" className={styles.form}>
        <p>
          <FormInputText
            labelText={t('forms.cif_nif')}
            className="form__inputfield"
            id="dniCif"
            name="dniCif"
            value={dniCif}
            onChange={handleChange}
          />
        </p>
        <p>
          <FormInputText
            labelText={t('forms.password')}
            className="form__inputfield"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </p>
        <p className={styles.withCheckbox}>
          <FormCheckbox
            labelText={t('forms.remember_me')}
            id="rememberMe"
            name="rememberMe"
            value={`${rememberMe === true}`}
            checked={rememberMe}
            onChange={handleChange}
          />
        </p>
        <div className={styles.link}>
          <Link to={'/lost-password-email'}>{t('links.forgot_password')}</Link>
        </div>
        <Button
          className="form__button"
          type="submit"
          disabled={!dniCif || !password || (!loading && error !== null)}
        >
          {t('forms.login_button')}
        </Button>
      </form>
    </Layout>
  );
}
