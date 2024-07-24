import './formElements.css';

interface FormInputTextProps {
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function FormInputText({
  id,
  name,
  value,
  type,
  onChange,
  required,
}: FormInputTextProps) {
  return (
    <input
      id={id}
      name={name}
      type={type ? type : 'text'}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
