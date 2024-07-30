import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
// import { FormInputText } from "../../components/formElements/formInputText";
// import { FormCheckbox } from "../../components/formElements/formCheckbox";
// import { Button } from "../../components/layout/common/Button";
import styles from './Login.module.css';
import { useState } from 'react';
import { authLogin } from '../../store/actions';

export function LoginPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dniCif: '',
    password: '',
  });

  const [formChecks, setFormChecks] = useState({
    isCompany: false,
    checked: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(authLogin(formData, formChecks));
  };

  const handleChange = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (event) => {
    setFormChecks(event.target.checked);
  };

  return (
    <Layout title="Log In" page="loginPage">
      <form id="login-form" className={styles.form}>
        <p>
          <label htmlFor="email">Email</label>
          {/* <FormInputText className="form__inputfield" id="email" name="email" value={email} onChange={handleChange} required /> */}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          {/* <FormInputText className="form__inputfield" type="password" id="password" name="password" value={password} onChange={handleChange} required /> */}
        </p>
        <p className={styles.withCheckbox}>
          {/* <FormCheckbox labelText="Remember me" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={handleChange} /> */}
        </p>
        {/* <Button className="form__button" type="submit">
          Log in
        </Button> */}
      </form>
    </Layout>
  );
}
