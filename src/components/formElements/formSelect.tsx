import './formElements.module.css';
interface FormSelectProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

export function FormSelect({
  id,
  labelText,
  name,
  value,
  onChange,
  options,
  required = false,
}: FormSelectProps) {
  return (
    <>
      <label>{labelText}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {Object.entries(options).map(([key, optionValue]) => (
          //DAL: cambio para que devuelva en value el texto y no el índice.
          // <option key={key} value={key}>
          <option key={key} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </>
  );
}
