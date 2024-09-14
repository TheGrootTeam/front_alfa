import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import Modal from 'react-modal';
import styles from './ContactForm.module.css';
import { getPublicInfo } from '../../utils/services/publicProfileService'; 

interface ContactFormProps {
  companyId: string; 
  offerName: string;
  isOpen: boolean;
  onRequestClose: () => void;
  applicantEmail: string;  
}

const ContactForm: React.FC<ContactFormProps> = ({
  companyId,
  applicantEmail,  
  offerName,
  isOpen,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [companyEmail, setCompanyEmail] = useState('');  

  // Function to obtain the company email from the API
  const fetchCompanyEmail = async () => {
    try {
      const companyData = await getPublicInfo(companyId, 'company');
      if (companyData.email) {
        setCompanyEmail(companyData.email);
      } else {
        console.error('No se pudo obtener el email de la empresa');
      }
    } catch (error) {
      console.error('Error al obtener el email de la empresa:', error);
    }
  };

  // Obtain the company's email when opening the Modal
  useEffect(() => {
    if (isOpen && companyId) {
      fetchCompanyEmail();
    }
  }, [isOpen, companyId]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Verify that all fields are full
    if (!companyEmail || !applicantEmail || !message) {
      console.error("Error: Todos los campos son requeridos.");
      alert('Error: Todos los campos son requeridos.');
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
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Correo enviado con éxito.');
        onRequestClose();
      } else {
        alert('Error al enviar el correo.');
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Error al enviar el correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Contactar Empresa"
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
          alignItems: 'center',
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
        <h2>Contactar a la Empresa</h2>
        <p>Para: {companyEmail ? companyEmail : 'Cargando email de la empresa...'}</p>
        <p>Asunto: {offerName}</p>
        <textarea
          placeholder="Me interesa esta oferta porque..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading || !companyEmail || !applicantEmail}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </Modal>
  );
};

export default ContactForm;
