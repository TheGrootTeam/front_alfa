import './formElements.module.css';

interface FormTextareaProps {
  labelText?: string;
  placeholder?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export function FormTextarea({
  labelText,
  placeholder,
  id,
  name,
  value,
  onChange,
  required,
}: FormTextareaProps) {
  return (
    <div>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>

    // <textarea
    //   id={id}
    //   name={name}
    //   value={value}
    //   onChange={onChange}
    //   required={required}
    // />
  );
}
