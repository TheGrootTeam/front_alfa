import { useTranslation } from 'react-i18next';
import styles from './form.module.css';
import { FormInputText } from '../formElements/formInputText';
import { Button } from '../common/Button';
import { useEffect, useState } from 'react';
import { FormCheckbox } from '../formElements/formCheckbox';
import Notification from '../common/Notification';
import { isPasswordStrong } from '../../utils/utilsForms';
import {
  IFormChangePassword,
  IFormReturnValidateForm,
} from '../../utils/interfaces/IFormElements';
import { changePasswordService } from '../../utils/services/passwordService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsCompany } from '../../store/selectors';

export function ChangePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isCompany = useSelector(getIsCompany);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<IFormChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { currentPassword, newPassword, confirmNewPassword } = formData;
  const [succesMessage, setSuccessMessage] = useState<string | null>(null);
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

  const validateForm = (data: IFormChangePassword): IFormReturnValidateForm => {
    setFormError(null);
    let isValid = true;
    let errorMessage = '';

    for (const value of Object.values(data)) {
      if (typeof value !== 'string' || value.trim().length === 0) {
        isValid = false;
        errorMessage = `${t('errors.required_field_error')}`;
        break;
      }
    }

    return { isValid, errorMessage };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verify missing fields or errors
    if (passwordError) return;
    const { isValid, errorMessage } = validateForm(formData);
    if (!isValid) {
      setFormError(errorMessage);
      return;
    }

    // if all ok
    try {
      await changePasswordService({ ...formData, isCompany });
      setSuccessMessage(t('notifications.password_change_success'));
      setTimeout(() => {
        navigate('/company');
      }, 2000);
    } catch (error: any) {
      if (error.status === 403) {
        setFormError(`${t('errors.password_current_wrong')}`);
      } else {
        setFormError(`${t('errors.generic_form_error')}`);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          <li>
            <FormInputText
              labelText={t('forms.current_password')}
              id="currentPassword"
              name="currentPassword"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword || ''}
              onChange={handleInputChange}
            />
          </li>
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
            <Button type="submit">{t('buttons.change_password')}</Button>
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
