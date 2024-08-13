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
import { ErrorsDisplay } from '../../components/common/ErrorDisplay';
// import { Loader } from '../../components/common/Loader';

export function LoginPage() {
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
    <Layout title="Log In" page="loginPage">
      {/* {loading && <Loader />} */}
      {error && <ErrorsDisplay content={error} onClickFunction={resetError} />}
      <form onSubmit={handleSubmit} id="login-form" className={styles.form}>
        <p>
          <FormInputText
            labelText="DNI/CIF"
            className="form__inputfield"
            id="dniCif"
            name="dniCif"
            value={dniCif}
            onChange={handleChange}
          />
        </p>
        <p>
          <FormInputText
            labelText="Password"
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
            labelText="Remember me"
            id="rememberMe"
            name="rememberMe"
            value={`${rememberMe === true}`}
            checked={rememberMe}
            onChange={handleChange}
          />
        </p>
        <Button
          className="form__button"
          type="submit"
          disabled={!dniCif || !password || (!loading && error !== null)}
        >
          Log in
        </Button>
      </form>
    </Layout>
  );
}
