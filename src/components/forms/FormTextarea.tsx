import { forwardRef } from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  showCount?: boolean;
  currentLength?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, maxLength, showCount, currentLength, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-mono uppercase tracking-wide text-white/90">
            {label}
            {required && <span className="text-monad-primary ml-1">*</span>}
          </label>
          {showCount && maxLength && (
            <span className="text-xs text-white/50">
              {currentLength || 0} / {maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          maxLength={maxLength}
          {...props}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white/5 border
            ${error ? "border-red-500" : "border-white/10"}
            text-white placeholder:text-white/40
            focus:outline-none focus:border-monad-primary
            transition-colors
            min-h-[120px] resize-y
          `}
        />
        {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
