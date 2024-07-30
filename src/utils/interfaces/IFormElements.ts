export interface IFormInputTextProps {
  labelText: string;
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface IFormRadioButtonProps {
  className: string;
  title: string;
  arrayOptions: Array<IFormInputTextProps>;
}
