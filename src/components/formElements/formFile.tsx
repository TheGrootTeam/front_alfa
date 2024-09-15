import { forwardRef } from "react";
import { IFormFileProps } from "../../utils/interfaces/IFormElements";

const FormField = forwardRef<HTMLInputElement, IFormFileProps>(({ className, label, ...props }, ref) => {
  return (
    <div className={className}>
      <label>
        <span>{label}</span>
        <input
          className="formField-input"
          autoComplete="off"
          {...props}
          ref={ref}
        />
      </label>
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;
