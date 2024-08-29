// MARTA TODO importar la interfaz correcta una vez nos aseguremos que con placeholder no peta
// import { IFormTextareaProps } from '../../utils/interfaces/IFormElements';
import './formElements.module.css';

interface IFormTextareaProps {
  labelText: string;
  className?: string;
  placeholder?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  cols?: number;
}

export function FormTextarea({
  labelText,
  id,
  name,
  value,
  onChange,
  ...props
}: IFormTextareaProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
