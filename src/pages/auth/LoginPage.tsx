import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { Button } from '../../components/common/Button';
import styles from './Login.module.css';
import { useState } from 'react';
import { authLogin } from '../../store/actions';
import { AppDispatch } from '../../store';

export function LoginPage() {

  const dispatch = useDispatch.withTypes<AppDispatch>();
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
      (event.target.type === 'checkbox')
        ? event.target.checked
        : event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  return (
    <Layout title="Log In" page="loginPage">
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
          disabled={!dniCif || !password}
        >
          Log in
        </Button>
      </form>
    </Layout>
  );
}
