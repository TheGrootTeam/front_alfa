import { IFormInputNumberProps } from '../../utils/interfaces/IFormElements';
import './formElements.module.css';

export function FormInputNumber({
  labelText,
  id,
  name,
  value,
  type = 'number',
  onChange,
  ...props
}: IFormInputNumberProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        step="1"
        value={value}
        type={type}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
