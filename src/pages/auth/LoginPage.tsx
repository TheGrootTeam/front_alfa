// @ts-nocheck
import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { Button } from '../../components/common/Button';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import styles from './Login.module.css';
import { useReducer, useState } from 'react';
import { authLogin } from '../../store/actions';
import formReducer from '../../state_logic/reducers/formReducer';

export function LoginPage() {
  // const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   const data = dispatchLocal(formReducer(localState));
  //   dispatchGlobal(authLogin(data));
  // };

  // const handleChange =
  //   (field = '') =>
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (field === 'check') {
  //       dispatchLocal(inputCheckChange(event));
  //     } else {
  //       dispatchLocal(inputChange(event));
  //     }
  //   };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dniCif: '',
    password: '',
    isCompany: null,
    rememberMe: false,
  });

  const { dniCif, password, isCompany, rememberMe } = formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(authLogin(formData));
  };

  const handleChange = (event) => {
    const value =
      (event.target.type === 'radio')
        ? JSON.parse(event.target.value)
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
        <FormRadioButton
          className={styles.radioContainer}
          title="Select type"
          arrayOptions={[
            {
              labelText: 'Company',
              name: 'isCompany',
              id: 'company',
              value: "true",
              checked: isCompany === true,
              onChange: handleChange
            },
            {
              labelText: 'Applicant',
              name: 'isCompany',
              id: 'applicant',
              value: "false",
              checked: isCompany === false,
              onChange: handleChange
            },
          ]}
        />
        <p className={styles.withCheckbox}>
          <FormCheckbox
            labelText="Remember me"
            id="rememberMe"
            name="rememberMe"
            value={rememberMe === true}
            checked={rememberMe}
            onChange={handleChange}
          />
        </p>
        <Button
          className="form__button"
          type="submit"
          disabled={!dniCif || !password || isCompany === null }
        >
          Log in
        </Button>
      </form>
    </Layout>
  );
}
