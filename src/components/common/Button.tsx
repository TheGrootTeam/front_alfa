import styles from './Button.module.css';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  type: string;
}

export function Button({
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
