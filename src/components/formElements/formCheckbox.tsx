import { FormCheckboxProps } from '../../utils/interfaces/IFormElements';
import './formElements.css';

export function FormCheckbox({
  id,
  labelText,
  name,
  checked,
  value,
  onChange,
  ...props
}: FormCheckboxProps) {
  return (
    <>
    <label key={id} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span>{labelText}</span>
    </label>
    </>
  );
}
