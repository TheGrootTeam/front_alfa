import styles from './SearchForm.module.css';

const SearchForm = () => {
  return (
    <>
      <div className={styles.searchForm}>
        <input className={styles.input} type="text" placeholder="search..." />
        <button className={styles.button}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default SearchForm;
