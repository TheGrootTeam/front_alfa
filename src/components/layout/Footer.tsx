import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ul className={styles.content}>
          <li>
            &copy; 2024 <strong>Proyecto Alfa</strong>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
