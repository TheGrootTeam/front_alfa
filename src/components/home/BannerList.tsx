import styles from "./BannersList.module.css";
import Banner from "./Banner";

const BannersList: React.FC = () => {
  return (
    <div>
      <ul className={styles.bannerList}>
        <Banner text="Banner #01" link="https://google.com" />
        <Banner text="Banner #02" link="https://google.com" />
        <Banner text="Banner #03" link="https://google.com" />
        <Banner text="Banner #04" link="https://google.com" />
      </ul>
    </div>
  );
};

export default BannersList;
