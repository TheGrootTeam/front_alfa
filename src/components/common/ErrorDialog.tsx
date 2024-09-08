import React from 'react';
import styles from './Dialog.module.css'; 

interface ErrorDialogProps {
  message: string;
  onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ message, onClose }) => {
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

export default ErrorDialog;
