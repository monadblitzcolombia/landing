import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
          {label}
          {required && <span className="text-monad-primary ml-1">*</span>}
        </label>
        <input
          ref={ref}
          {...props}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white/5 border
            ${error ? "border-red-500" : "border-white/10"}
            text-white placeholder:text-white/40
            focus:outline-none focus:border-monad-primary
            transition-colors
          `}
        />
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
