import React from 'react';
import styles from './ListingDetail.module.css';

interface ListingProps {
  id: number;
  title: string;
  description: string;
}

const ListingDetail: React.FC<ListingProps> = ({ id, title, description }) => {
  return (
    <div className={styles.listing}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

/*TODO: botones en funcion del perfil que esté entrando (companies o user) y si el user ha aplicado o no */

export default ListingDetail;
