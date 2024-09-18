import { IFormInputTextProps } from '../../utils/interfaces/IFormElements';
import './formElements.module.css';

export function FormInputText({
  labelText,
  id,
  name,
  value,
  type = 'text',
  onChange,
  readOnly = false,
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
        readOnly={readOnly}
        {...props}
      />
    </>
  );
}
