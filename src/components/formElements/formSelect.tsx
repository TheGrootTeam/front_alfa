import './formElements.module.css';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Record<string, string>;
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange} >
        {Object.entries(options).map(([key, optionValue]) => (
          <option key={key} value={key}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  );
}
