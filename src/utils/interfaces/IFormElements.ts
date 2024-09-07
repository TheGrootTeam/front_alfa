export interface IFormInputTextProps {
  labelText: string;
  className?: string;
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  checked?: boolean;
  readOnly?: boolean;
}

export interface IFormTextareaProps {
  labelText: string;
  className?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  cols?: number;
}

export interface IFormInputNumberProps {
  labelText: string;
  className?: string;
  id: string;
  name: string;
  value: number;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change the value directly a number
  required?: boolean;
  min?: number; // minimun value
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

export interface IFormChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IFormReturnValidateForm {
  isValid: boolean;
  errorMessage: string;
}
