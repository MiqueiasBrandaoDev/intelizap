
import React from "react";
import { AlertCircle } from "lucide-react";

interface NewsletterFormFieldProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const NewsletterFormField = ({ email, onChange, error }: NewsletterFormFieldProps) => {
  return (
    <div className="flex-grow">
      <input
        type="email"
        placeholder="Introduce tu dirección de email"
        className={`px-4 py-3 bg-zinc-800 dark:bg-zinc-800 border ${error ? 'border-red-500' : 'border-zinc-700'} dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-exertion-500 w-full text-white`}
        value={email}
        onChange={onChange}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

export default NewsletterFormField;
