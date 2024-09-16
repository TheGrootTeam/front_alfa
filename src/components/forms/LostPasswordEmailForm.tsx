import { useTranslation } from 'react-i18next';
import styles from './form.module.css';
import { useState } from 'react';
import { FormInputText } from '../formElements/formInputText';
import { Button } from '../common/Button';
import Notification from '../common/Notification';
import { verifyEmailService } from '../../utils/services/passwordService';
import { useNavigate } from 'react-router-dom';

export function LostPasswordEmailForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [succesMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // verify format email
      if (!isValidEmail(email)) {
        setError(t('errors.email_invalid'));
      } else {
        await verifyEmailService(email);
        setSuccessMessage(t('notifications.email_sended'));
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error: any) {
      if (error.status === 404) {
        setError(t('errors.no_user_email'));
      } else {
        setError(error.message || error.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleErrorClick = () => {
    setError(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.email')}
              id="email"
              name="email"
              type="email"
              value={email || ''}
              onChange={handleEmail}
            />
            {error && (
              <Notification
                type="error"
                message={error}
                onClick={handleErrorClick}
              />
            )}
          </li>
          <li>
            <Button type="submit" disabled={loading || !email}>
              {t('buttons.lost_password_email')}
            </Button>
          </li>
        </ul>
        {succesMessage && (
          <Notification type="success" message={succesMessage} />
        )}
      </form>
    </>
  );
}
