import './formElements.css';

interface FormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export function FormTextarea({
  id,
  name,
  value,
  onChange,
  required,
}: FormTextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
