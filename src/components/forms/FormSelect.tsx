import { forwardRef } from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, required, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
          {label}
          {required && <span className="text-monad-primary ml-1">*</span>}
        </label>
        <select
          ref={ref}
          {...props}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white/5 border
            ${error ? "border-red-500" : "border-white/10"}
            text-white
            focus:outline-none focus:border-monad-primary
            transition-colors
            appearance-none
            cursor-pointer
          `}
        >
          <option value="" disabled>
            Selecciona una opcion
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
