import "./formElements.css";

interface FormFieldsetProps {
  className?: string;
  labelText: string;
  children: React.ReactNode;
}

export function FormFieldset({ className, labelText, children }: FormFieldsetProps) {
  return (
    <fieldset className={className}>
      <span className="radiogroup__label">{labelText}</span>
      <span className="radiogroup__options">{children}</span>
    </fieldset>
  );
}
