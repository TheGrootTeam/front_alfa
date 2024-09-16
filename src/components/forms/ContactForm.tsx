import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import Modal from 'react-modal';
import Notification from '../common/Notification';
import styles from './ContactForm.module.css';
import { getPublicInfo } from '../../utils/services/publicProfileService';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
  companyId: string;
  offerName: string;
  isOpen: boolean;
  onRequestClose: () => void;
  applicantEmail: string;
  applicantId: string;
  applicantName: string;  
  applicantLastName: string;  
}

const ContactForm: React.FC<ContactFormProps> = ({
  companyId,
  applicantEmail,
  applicantId,
  applicantName,
  applicantLastName,  
  offerName,
  isOpen,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { t } = useTranslation();

  // Function to get the company's email from the API
  const fetchCompanyEmail = async () => {
    try {
      const companyData = await getPublicInfo(companyId, 'company');
      if (companyData.email && companyData.company) {
        setCompanyEmail(companyData.email);
        setCompanyName(companyData.company);
      } else {
        console.error('No se pudo obtener la información de la empresa');
      }
    } catch (error) {
      console.error('Error al obtener la información de la empresa:', error);
    }
  };

  useEffect(() => {
    if (isOpen && companyId) {
      fetchCompanyEmail();

      setMessage('');
      setNotification(null);
    }
  }, [isOpen, companyId]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    if (!companyEmail || !applicantEmail || !message || !applicantId || !applicantName || !applicantLastName) {
      setNotification({
        message: t('errors.all_fields_required'),
        type: 'error',
      });
      setLoading(false);
      return;
    }
  
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const apiVersion = import.meta.env.VITE_API_VERSION;
  
      const url = `${apiUrl}/api/${apiVersion}/send-email/contact-company`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicantEmail,
          companyEmail,
          offerTitle: offerName,
          message,
          applicantId,
          applicantName,
          applicantLastName,  
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        setNotification({
          message: t('notifications.mail_sending_success'),
          type: 'success',
        });
        setTimeout(() => {
          onRequestClose();
        }, 2000);
      } else {
        setNotification({
          message: t('errors.mail_sending_error'),
          type: 'error',
        });
      }
    } catch (error) {
      setNotification({
        message: t('errors.mail_sending_error'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={t('titles.contact_company')}
      style={{
        content: {
          width: '40%',
          height: '60%',
          margin: 'auto',
          borderRadius: '20px',
          padding: '1.5rem',
          backgroundColor: '#fff',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'center',
        },
      }}
    >
      <div className={styles.modalHeader}>
        <button onClick={onRequestClose} className={styles.closeButton}>
          X
        </button>
      </div>
      <form onSubmit={handleSendEmail} className={styles.form}>
        <h2>
          {t('titles.contact_')} {companyName}
        </h2>
        <p>
          {t('gen.mail_subject')} {offerName}
        </p>
        <textarea
          placeholder={t('forms.mail_message_placeholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={loading || !companyEmail || !applicantEmail}
        >
          {loading ? t('buttons.mail_sending') : t('buttons.mail_send')}
        </Button>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClick={() => setNotification(null)}
        />
      )}
    </Modal>
  );
};

export default ContactForm;
