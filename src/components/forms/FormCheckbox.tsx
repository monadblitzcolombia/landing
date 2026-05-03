import { forwardRef } from "react";

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            ref={ref}
            {...props}
            className="
              mt-1 w-5 h-5 rounded
              bg-white/5 border border-white/10
              checked:bg-monad-primary checked:border-monad-primary
              focus:outline-none focus:ring-2 focus:ring-monad-primary/50
              transition-colors cursor-pointer
            "
          />
          <span className="text-sm text-white/80 group-hover:text-white transition-colors">
            {label}
          </span>
        </label>
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
