import React, { useState } from 'react';
import Dialog from './Dialog';
import styles from './ConfirmationButton.module.css';

interface ConfirmationButtonProps {
  onConfirm: () => void;
  label: string;
  confirmationMessage: string;
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  onConfirm,
  label,
  confirmationMessage
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setShowDialog(false);
  };

  return (
    <>
      <button className={styles.button} onClick={() => setShowDialog(true)}>
        {label}
      </button>
      {showDialog && (
        <Dialog
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default ConfirmationButton;
