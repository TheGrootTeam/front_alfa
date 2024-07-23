import Layout from "../../components/layout/Layout";
// import { FormInputText } from "../../components/formElements/formInputText";
// import { FormCheckbox } from "../../components/formElements/formCheckbox";
// import { Button } from "../../components/layout/common/Button";
import styles from "./LoginPage.module.css";

export function LoginPage() {
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
        <p className={styles.withCheckbox}>{/* <FormCheckbox labelText="Remember me" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={handleChange} /> */}</p>
        {/* <Button className="form__button" type="submit">
          Log in
        </Button> */}
      </form>
    </Layout>
  );
}
