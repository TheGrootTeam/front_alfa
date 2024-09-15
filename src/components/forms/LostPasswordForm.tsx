import { useTranslation } from 'react-i18next';
import styles from './form.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInputText } from '../formElements/formInputText';
import { useEffect, useState } from 'react';
import { IFormForgotPassword } from '../../utils/interfaces/IFormElements';
import { FormCheckbox } from '../formElements/formCheckbox';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import { isPasswordStrong } from '../../utils/utilsForms';
import { renewPasswordService } from '../../utils/services/passwordService';

export function LostPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [succesMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formData, setFormData] = useState<IFormForgotPassword>({
    newPassword: '',
    confirmNewPassword: '',
  });
  const { newPassword, confirmNewPassword } = formData;

  useEffect(() => {
    if (!newPassword || !confirmNewPassword)
      setPasswordError(t('errors.password_empty'));
    else if (newPassword !== confirmNewPassword)
      setPasswordError(t('errors.password_different'));
    else if (!isPasswordStrong(newPassword))
      setPasswordError(t('errors.password_rules'));
    else setPasswordError(null);
  }, [newPassword, confirmNewPassword, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    try {
      await renewPasswordService({
        newPassword,
        token: token as string,
      });
      setSuccessMessage(t('notifications.password_change_success'));
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error: any) {
      // error missing fields
      if (error.error.includes('fields')) {
        setFormError(t('errors.all_fields_required'));
        // password format
      } else if (error.error.includes('format')) {
        setFormError(t('errors.password_rules'));
        // expired token
      } else if (error.error.includes('expired')) {
        setFormError(t('errors.expired_token'));
        // invalid token
      } else if (error.status === 401) {
        setFormError(t('errors.invalid_token'));
        // user not found in bbdd
      } else if (error.error.includes('User')) {
        setFormError(t('errors.user_not_found'));
      } else {
        setFormError(error.message || error.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.new_password')}
              id="newPassword"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={newPassword || ''}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <FormInputText
              labelText={t('forms.new_password_confirm')}
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmNewPassword || ''}
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
            <Button type="submit" disabled={loading || !!passwordError}>
              {t('buttons.change_password')}
            </Button>
          </li>
        </ul>
        {formError && <Notification type="error" message={formError} />}
        {succesMessage && (
          <Notification type="success" message={succesMessage} />
        )}
      </form>
    </>
  );
}
