
import React from "react";
import { AlertCircle } from "lucide-react";

interface ContactFormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  rows?: number;
}

const ContactFormField = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  rows
}: ContactFormFieldProps) => {
  const isTextarea = type === "textarea";
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && "*"}
      </label>
      <Component 
        id={id} 
        name={name} 
        type={isTextarea ? undefined : type} 
        value={value}
        onChange={onChange}
        rows={isTextarea ? rows : undefined}
        className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-zinc-700'} rounded-lg focus:ring-2 focus:ring-exertion-500 focus:border-exertion-500 bg-zinc-800 text-zinc-100`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

export default ContactFormField;
