import { cn } from '../../lib/utils';

export function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  autoComplete,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-teal"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'h-12 border bg-white px-3 text-sm text-navy outline-none transition-colors placeholder:text-muted/70',
          error ? 'border-teal' : 'border-line focus:border-navy',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-navy">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormSelect({ id, label, value, onChange, options, error, required, placeholder = 'Select' }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-teal"> *</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'h-12 border bg-white px-3 text-sm text-navy outline-none transition-colors',
          error ? 'border-teal' : 'border-line focus:border-navy',
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-xs text-navy">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormTextarea({ id, label, value, onChange, error, required, rows = 6, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-teal"> *</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'resize-y border bg-white px-3 py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted/70',
          error ? 'border-teal' : 'border-line focus:border-navy',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-navy">
          {error}
        </p>
      )}
    </div>
  );
}
