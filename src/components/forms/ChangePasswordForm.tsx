import { useTranslation } from 'react-i18next';
import styles from './form.module.css';
import { FormInputText } from '../formElements/formInputText';
import { Button } from '../common/Button';
import { useEffect, useState } from 'react';
import { FormCheckbox } from '../formElements/formCheckbox';
import Notification from '../common/Notification';
import { isPasswordStrong } from '../../utils/utilsForms';

export function ChangePasswordForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { currentPassword, newPassword, confirmNewPassword } = formData;
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!newPassword || !confirmNewPassword || !currentPassword)
      setPasswordError(t('errors.password_empty'));
    else if (newPassword !== confirmNewPassword)
      setPasswordError(t('errors.password_different'));
    else if (!isPasswordStrong(newPassword))
      setPasswordError(t('errors.password_rules'));
    else setPasswordError(null);
  }, [newPassword, confirmNewPassword, currentPassword, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.current_password')}
              id="currentPassword"
              name="currentPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.currentPassword || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.new_password')}
              id="newPassword"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.new_password_confirm')}
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmNewPassword || ''}
              onChange={handleInputChange}
            />
            {passwordError && (
              <Notification type="error" message={passwordError} />
            )}
          </li>
          <li>
            <FormCheckbox
              id="showPassword-checkbox"
              name="showPassword"
              labelText={t('forms.password_show')}
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
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
