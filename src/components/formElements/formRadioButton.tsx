import './formElements.css';

interface FormRadioButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  value: string;
  checked: boolean;
}

export function FormRadioButton({
  onChange,
  id,
  name,
  value,
  checked,
}: FormRadioButtonProps) {
  return (
    <>
      <input
        onChange={onChange}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
      />
      <label htmlFor={id}>{id}</label>
    </>
  );
}
