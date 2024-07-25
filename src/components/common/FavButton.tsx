import React, { useState } from 'react';
import styles from './FavButton.module.css';

interface FavButtonProps {
  initialFavorite?: boolean;
  onToggleFavorite?: (isFavorite: boolean) => void;
}

const FavButton: React.FC<FavButtonProps> = ({ initialFavorite = false, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (onToggleFavorite) {
      onToggleFavorite(newFavoriteStatus);
    }
  };

  return (
    <button className={styles.favButton} onClick={handleClick}>
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

export default FavButton;
