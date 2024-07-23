import "./formElements.css";

interface FormCheckboxProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormCheckbox({ id, labelText, name, value, checked, onChange }: FormCheckboxProps) {
  return (
    <label key={id} htmlFor={id}>
      <input type="checkbox" id={id} name={name} value={value} checked={checked} onChange={onChange} />
      <span>{labelText}</span>
    </label>
  );
}
