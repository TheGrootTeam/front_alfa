import './formElements.module.css';

interface MultiSelectOption {
  _id: string;
  [key: string]: string;
}

interface FormMultiSelectProps {
  id: string;
  labelText: string;
  name: string;
  value: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: MultiSelectOption[];
  optionLabel: string; // The key to use as the label (e.g., 'rol', 'skill')
}

export function FormMultiSelect({
  id,
  labelText,
  name,
  value,
  onChange,
  options,
  optionLabel,
}: FormMultiSelectProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <select id={id} name={name} value={value} onChange={onChange} multiple>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option[optionLabel]} {/* Use dynamic field */}
          </option>
        ))}
      </select>
    </>
  );
}
