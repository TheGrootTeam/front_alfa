import { IFormTextareaProps } from '../../utils/interfaces/IFormElements';
import './formElements.module.css';

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
