import { IFormInputTextProps } from '../../utils/interfaces/IFormElements';
import './formElements.css';

export function FormInputText({
  labelText,
  id,
  name,
  value,
  type = 'text',
  onChange,
  ...props
}: IFormInputTextProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
