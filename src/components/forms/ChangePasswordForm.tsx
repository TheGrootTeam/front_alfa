import { useTranslation } from 'react-i18next';
import styles from './form.module.css';
import { FormInputText } from '../formElements/formInputText';
import { Button } from '../common/Button';

export function ChangePasswordForm() {
  const { t } = useTranslation();

  return (
    <>
      <form className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.current_password')}
              id="currentPassword"
              name="currentPassword"
              // type={showPassword ? 'text' : 'password'}
              value="a"
              onChange={() => ''}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.new_password')}
              id="newPassword"
              name="newPassword"
              // type={showPassword ? 'text' : 'password'}
              value="a"
              onChange={() => ''}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.new_password_confirm')}
              id="confirmNewPassword"
              name="confirmNewPassword"
              // type={showPassword ? 'text' : 'password'}
              value="a"
              onChange={() => ''}
            />
          </li>
          <li>
            <Button type="submit">{t('buttons.change_password')}</Button>
          </li>
        </ul>
      </form>
    </>
  );
}
