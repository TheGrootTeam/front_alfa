import './formElements.module.css';
interface FormSelectProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export function FormSelect({
  id,
  labelText,
  name,
  value,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <>
      <label>{labelText}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {Object.entries(options).map(([key, optionValue]) => (
          <option key={key} value={key}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  );
}
