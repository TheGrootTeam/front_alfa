// import { useDispatch } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { useState } from 'react';
import styles from './Register.module.css';
import { FormInputText } from '../../components/formElements/formInputText';
import { FormRadioButton } from '../../components/formElements/formRadioButton';
import { Button } from '../../components/common/Button';

export function RegisterPage() {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dniCif: '',
    password: '',
    isCompany: null,
  });

  const { dniCif, password, isCompany } = formData;

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    //dispatch();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === 'radio'
        ? JSON.parse(event.target.value)
        : event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: value,
    }));
  };

  return (
    <Layout title="Register" page="register">
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
              value: 'true',
              checked: isCompany === true,
              onChange: handleChange,
            },
            {
              labelText: 'Applicant',
              name: 'isCompany',
              id: 'applicant',
              value: 'false',
              checked: isCompany === false,
              onChange: handleChange,
            },
          ]}
        />
        <Button
          className="form__button"
          type="submit"
          disabled={!dniCif || !password || isCompany === null}
        >
          Log in
        </Button>
      </form>
    </Layout>
  );
}
