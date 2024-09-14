import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ContactForm.module.css';
import { getPublicInfo } from '../../utils/services/publicProfileService'; // Importar el servicio que obtiene los datos

interface ContactFormProps {
  companyId: string; // Necesitamos el ID de la compañía para obtener su información
  offerName: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  companyId, // Ahora necesitamos el ID de la empresa
  offerName,
  isOpen,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [companyEmail, setCompanyEmail] = useState(''); // Estado para almacenar el email de la empresa

  // Función para obtener el email de la empresa desde el API
  const fetchCompanyEmail = async () => {
    try {
      const companyData = await getPublicInfo(companyId, 'company'); // Usar la función getPublicInfo
      if (companyData.email) {
        setCompanyEmail(companyData.email); // Guardar el email obtenido
      } else {
        console.error('No se pudo obtener el email de la empresa');
      }
    } catch (error) {
      console.error('Error al obtener el email de la empresa:', error);
    }
  };

  // Llamar a fetchCompanyEmail cuando el modal se abra
  useEffect(() => {
    if (isOpen && companyId) {
      fetchCompanyEmail(); // Solo obtener el email cuando el modal se abra y companyId esté disponible
    }
  }, [isOpen, companyId]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Verificar que todos los campos están llenos antes de enviar el correo
    if (!companyEmail || !message) {
      console.error("Error: Uno o más campos están vacíos.");
      alert('Error: Todos los campos son requeridos.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/send-email/contact-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyEmail, // Enviar el email de la empresa
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
        <p>Para: {companyEmail ? companyEmail : 'Cargando email de la empresa...'}</p> {/* Mostrar el email o un mensaje de carga */}
        <p>Asunto: {offerName}</p>
        <textarea
          placeholder="Me interesa esta oferta porque..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading || !companyEmail}> {/* Deshabilitar hasta que el email esté disponible */}
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </Modal>
  );
};

export default ContactForm;
