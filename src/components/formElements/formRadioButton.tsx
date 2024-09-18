import { IFormRadioButtonProps } from '../../utils/interfaces/IFormElements';
import './formElements.module.css';

export function FormRadioButton({
  className,
  title,
  arrayOptions,
}: IFormRadioButtonProps) {
  return (
    <div className={className}>
      <p>{title}</p>
      {arrayOptions.map(({ labelText, id, ...props }) => (
        <div key={id}>
          <label htmlFor={id}>{labelText}</label>
          <input type="radio" id={id} {...props}></input>
        </div>
      ))}
    </div>
  );
}
