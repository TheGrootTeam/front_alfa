import { ICustomErrorListings } from '../../utils/interfaces/IOffer';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayParams {
  content: ICustomErrorListings | string | null;
  onClickFunction?: () => void;
}

export function ErrorsDisplay({
  content,
  onClickFunction,
}: ErrorDisplayParams) {
  // Handle the case where onClickFunction is not defined as a parameter
  const handleClick = onClickFunction ? () => onClickFunction() : undefined;

  if (typeof content === 'string') {
    return (
      <div className={styles.error} onClick={handleClick}>
        {content}
      </div>
    );
  } else {
    return (
      <div className={styles.error} onClick={handleClick}>
        <p>{content?.message}</p>
        <p>{content?.status}</p>
        <p>{content?.statusText}</p>
      </div>
    );
  }
}
