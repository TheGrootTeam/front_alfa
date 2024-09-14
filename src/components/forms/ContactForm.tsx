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
  const [companyEmail, setCompanyEmail] = useState('');  // Estado para almacenar el email de la empresa
  const [companyName, setCompanyName] = useState('');    // Estado para almacenar el nombre de la empresa

  // Function to obtain the company name and email from the API
  const fetchCompanyInfo = async () => {
    try {
      const companyData = await getPublicInfo(companyId, 'company');
      if (companyData.email && companyData.company) {
        setCompanyEmail(companyData.email);
        setCompanyName(companyData.company);  // Guardar el nombre de la empresa
      } else {
        console.error('No se pudo obtener la información de la empresa');
      }
    } catch (error) {
      console.error('Error al obtener la información de la empresa:', error);
    }
  };

  // Obtener el nombre y el email de la empresa al abrir el modal
  useEffect(() => {
    if (isOpen && companyId) {
      fetchCompanyInfo();
    }
  }, [isOpen, companyId]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Verificar que todos los campos están llenos
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
        <h2>Contactar a {companyName}</h2>  {/* Mostrar el nombre de la empresa */}
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
