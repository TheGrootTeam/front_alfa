import "./formElements.css";

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Record<string, string>;
}

export function FormSelect({ name, value, onChange, options }: FormSelectProps) {
  return (
    <select name={name} value={value} onChange={onChange}>
      {Object.entries(options).map(([key, optionValue]) => (
        <option key={key} value={key}>
          {optionValue}
        </option>
      ))}
    </select>
  );
}
