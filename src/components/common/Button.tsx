import styles from './Button.module.css';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
  type?: string;
}

export function Button({
  onClick,
  disabled,
  id,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      id={id}
      className={`${styles.button} ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
