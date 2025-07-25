
import React from "react";

interface ContactFormPrivacyCheckProps {
  id: string;
}

const ContactFormPrivacyCheck = ({ id }: ContactFormPrivacyCheckProps) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={id} 
        className="h-4 w-4 text-exertion-600 focus:ring-exertion-500 border-zinc-700 rounded"
        required
      />
      <label htmlFor={id} className="ml-2 block text-sm">
        Acepto la <a href="#" className="text-exertion-400 hover:underline">política de privacidad</a> *
      </label>
    </div>
  );
};

export default ContactFormPrivacyCheck;
