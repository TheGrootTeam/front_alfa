import React from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
  message: string | null;
  type: 'success' | 'error'; // We can add other types if necessary;
  onClick?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClick,
}) => {
  // Handle the case where onClickFunction is not defined as a parameter
  const handleClick = onClick ? () => onClick() : undefined;

  return (
    <div
      className={`${styles.notification} ${styles[type]}`}
      onClick={handleClick}
    >
      {message}{' '}
    </div>
  );
};

export default Notification;
