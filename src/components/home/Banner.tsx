import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

interface BannerProps {
  text: string;
  link: string;
}

const Banner: React.FC<BannerProps> = ({ text, link }) => {
  return (
    <li className={styles.banner}>
      <Link to={link}>{text}</Link>
    </li>
  );
};

export default Banner;
