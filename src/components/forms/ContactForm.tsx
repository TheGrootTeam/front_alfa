import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  companyEmail: string;
  applicantEmail: string;
  offerName: string;
  companyName: string; 
  isOpen: boolean;
  onRequestClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  companyEmail,
  applicantEmail,
  offerName,
  companyName,
  isOpen,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

   // Agregar este console.log para verificar si el valor de companyEmail es correcto
  console.log('Company Email:', companyEmail);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!companyEmail) {
        alert('No se ha encontrado el email de la empresa.');
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('/api/v1/send-email/contact-company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                applicantEmail,
                companyEmail,
                offerTitle: offerName,
                message
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
        console.error('Error al enviar el correo', error);
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
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
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
        <p>De: {applicantEmail}</p>
        <p>Para: {companyName}</p>
        <p>Asunto: {offerName}</p>
        <textarea
          placeholder="Me interesa esta oferta porque..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </Modal>
  );
};

export default ContactForm;
