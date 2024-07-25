import styles from './Tags.module.css';

interface TagsProps {
  skills: string[];
}

const Tags: React.FC<TagsProps> = ({ skills }) => {
  return (
    <div className={styles.tags}>
      {skills.map((skill, index) => (
        <span key={index} className={styles.tag}>
          {skill}
        </span>
      ))}
    </div>
  );
};

export default Tags;
