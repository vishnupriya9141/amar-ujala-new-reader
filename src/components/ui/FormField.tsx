import { ReactNode } from "react";
import { Input } from "./input";
import { Button } from "./button";

interface FormFieldProps {
  label?: string;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  required?: boolean;
  onSubmit?: (value: string) => void;
  children?: ReactNode;
}

const FormField = ({
  label,
  placeholder = "Enter value",
  buttonText = "Submit",
  type = "text",
  required = false,
  onSubmit,
  children
}: FormFieldProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("input") as string;
    if (value && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          name="input"
          type={type}
          placeholder={placeholder}
          required={required}
          className="flex-1"
        />
        <Button type="submit">{buttonText}</Button>
      </form>
      {children}
    </div>
  );
};

export default FormField;