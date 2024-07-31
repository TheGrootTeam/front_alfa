export interface IFormInputTextProps {
  labelText: string;
  className?:string;
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  checked?: boolean;
}

export interface IFormRadioButtonProps {
  className: string;
  title: string;
  arrayOptions: Array<IFormInputTextProps>;
  checked?: boolean;
}

export interface FormCheckboxProps {
  id: string;
  value?: string;
  labelText: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}