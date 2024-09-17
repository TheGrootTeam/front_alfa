import './formElements.module.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Sort the options array alphabetically by the optionLabel
  const sortedOptions = [...options].sort((a, b) =>
    a[optionLabel].localeCompare(b[optionLabel])
  );

  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <em style={{ textAlign: 'left' }}>{t('forms.multi_instructions')}</em>
      <select
        id={id}
        name={name}
        value={value} // Ensure the selected values are passed as an array
        onChange={onChange}
        multiple // Keep the 'multiple' attribute
      >
        {sortedOptions.map((option) => (
          <option key={option._id} value={option._id}>
            {option[optionLabel]} {/* Display the correct label */}
          </option>
        ))}
      </select>
    </>
  );
}
