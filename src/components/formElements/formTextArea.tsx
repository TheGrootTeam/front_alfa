import './formElements.module.css';

interface FormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  labelText: string; // Agregar la propiedad labelText
}

export function FormTextarea({
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  labelText, // Incluir labelText en las props
}: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id}>{labelText}</label> {/* Usar labelText */}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}