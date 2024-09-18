import styles from './UserData.module.css';
import Github from '../../assets/icons/github.svg?react';
import Linkedin from '../../assets/icons/linkedin.svg?react';

interface UserDataProps {
  name: string;
  github: string;
  linkedin: string;
  photo: string;
  children: string;
}

export const UserData = ({
  name,
  github,
  linkedin,
  photo,
  children,
}: UserDataProps) => {
  return (
    <div className={styles.card__container}>
      <header className={styles.card__header}>
        <div className={styles.card__image}>
          <img src={`/avatars/${photo}`} alt="" />
        </div>
        <div className={styles.card__info}>
          <h3>{name}</h3>
          <ul className={styles.card__social}>
            <li>
              <a
                target="_blank"
                href={`https://www.linkedin.com/in/${linkedin}/`}
              >
                <Linkedin className={styles.icon} />
              </a>
            </li>
            <li>
              <a target="_blank" href={`https://github.com/${github}/`}>
                <Github className={styles.icon} />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <footer>
        <div>{children}</div>
      </footer>
    </div>
  );
};
