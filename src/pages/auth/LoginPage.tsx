// @ts-nocheck
import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormCheckbox } from '../../components/formElements/formCheckbox';
import { Button } from '../../components/common/Button';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import styles from './Login.module.css';
import { useReducer } from 'react';
import { authLogin } from '../../store/actions';
import formReducer from '../../state_logic/reducers/formReducer';

export function LoginPage() {
  const initialData = {
    dniCif: '',
    password: '',
    isCompany: null,
    rememberMe: false,
  };

  const { dniCif, password, isCompany, rememberMe } = initialData;

  const dispatchGlobal = useDispatch();
  const [localState, dispatchLocal] = useReducer(formReducer, initialData);

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = dispatchLocal(formReducer(localState));
    dispatchGlobal(authLogin(data));
  };

  const handleChange =
    (field = '') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'check') {
        dispatchLocal(inputCheckChange(event));
      } else {
        dispatchLocal(inputChange(event));
      }
    };

  return (
    <Layout title="Log In" page="loginPage">
      <form onSubmit={handleSubmit} id="login-form" className={styles.form}>
        <p>
          <label htmlFor="dniCif">DNI/CIF</label>
          <FormInputText
            className="form__inputfield"
            id="dniCif"
            name="dniCif"
            value={dniCif}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <FormInputText
            label="Password"
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
          name="isCompany"
          options={[
            {
              label: 'Company',
              id: 'company',
              value: 'true',
            },
            {
              label: 'Applicant',
              id: 'applicant',
              value: 'false',
            },
          ]}
          selectedOption={
            localState.isCompany === null
              ? null
              : localState.isCompany.toString()
          }
          onChange={() => handleChange('check')}
        />
        <p className={styles.withCheckbox}>
          <FormCheckbox
            labelText="Remember me"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => handleChange('check')}
          />
        </p>
        <Button
          className="form__button"
          type="submit"
          disabled={!dniCif || !password || isCompany === null || isFetching}
        >
          Log in
        </Button>
      </form>
    </Layout>
  );
}
