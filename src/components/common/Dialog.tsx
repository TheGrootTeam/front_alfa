import React from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  closeLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({
  message,
  onConfirm,
  onCancel,
  onClose,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  closeLabel = 'OK'
}) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.dialogActions}>
          {onConfirm && <button onClick={onConfirm}>{confirmLabel}</button>}
          {onCancel && <button onClick={onCancel}>{cancelLabel}</button>}
          {onClose && !onConfirm && !onCancel && (
            <button onClick={onClose}>{closeLabel}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
