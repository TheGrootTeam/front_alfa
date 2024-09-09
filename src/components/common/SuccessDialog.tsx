import React from 'react';
import styles from './Dialog.module.css'; 
interface SuccessDialogProps {
  message: string;
  onClose: () => void; 
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ message, onClose }) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <button className={styles.buttonConfirm} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;
