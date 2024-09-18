import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
    </div>
  );
}
