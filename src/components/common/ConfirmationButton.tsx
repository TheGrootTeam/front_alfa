import React, { useState } from 'react';
import { Button } from './Button';
import Dialog from './Dialog';

import styles from './ConfirmationButton.module.css';

interface ConfirmationButtonProps {
  buttonLabel: string;
  dialogText: string;
  confirmLabel: string;
  cancelLabel: string;
  confirmAction: () => void;
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  buttonLabel,
  dialogText,
  confirmLabel,
  cancelLabel,
  confirmAction,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    confirmAction();
    setShowDialog(false);
  };

  return (
    <>
      <Button className={styles.button} onClick={() => setShowDialog(true)}>
        {buttonLabel}
      </Button>
      {showDialog && (
        <Dialog
          dialogText={dialogText}
          onConfirm={handleConfirm}
          confirmLabel={confirmLabel}
          onCancel={() => setShowDialog(false)}
          cancelLabel={cancelLabel}
        />
      )}
    </>
  );
};

export default ConfirmationButton;
