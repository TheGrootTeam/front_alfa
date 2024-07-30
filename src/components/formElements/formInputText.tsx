import { IFormInputTextProps } from '../../utils/interfaces/IFormElements';
import './formElements.css';

export function FormInputText({
  labelText,
  id,
  name,
  value,
  type,
  onChange,
  required,
  ...props
}: IFormInputTextProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
