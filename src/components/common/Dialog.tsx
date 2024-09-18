import React from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  dialogText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const Dialog: React.FC<DialogProps> = ({
  dialogText,
  onConfirm,
  onCancel,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
}) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{dialogText}</p>
        {onConfirm && (
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            {confirmLabel}
          </button>
        )}
        {onCancel && (
          <button className={styles.buttonCancel} onClick={onCancel}>
            {cancelLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialog;
