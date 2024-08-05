import styles from './ErrorDisplay.module.css';

interface ErrorDisplayParams {
  content: string | null;
  onClickFunction?: () => void;
}

export function ErrorsDisplay({
  content,
  onClickFunction,
}: ErrorDisplayParams) {
  // Handle the case where onClickFunction is not defined as a parameter
  const handleClick = onClickFunction ? () => onClickFunction() : undefined;

  return (
    <div className={styles.error} onClick={handleClick}>
      {content}
    </div>
  );
}
