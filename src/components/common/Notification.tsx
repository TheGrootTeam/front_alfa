
import React from 'react';
import styles from './Notification.module.css'; 

interface NotificationProps {
  message: string;
  type: 'success' | 'error'; // We can add other types if necessary
}

export const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
