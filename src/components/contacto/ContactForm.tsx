
import React from "react";
import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import ContactFormField from "./ContactFormField";
import ContactFormPrivacyCheck from "./ContactFormPrivacyCheck";

const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useContactForm();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Envíenos un Mensaje</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <ContactFormField
          id="name"
          name="name"
          label="Nombre Completo"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <ContactFormField
          id="email"
          name="email"
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <ContactFormField
          id="phone"
          name="phone"
          label="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        
        <ContactFormField
          id="subject"
          name="subject"
          label="Asunto"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          required
        />
        
        <ContactFormField
          id="message"
          name="message"
          label="Mensaje"
          type="textarea"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          required
        />
        
        <ContactFormPrivacyCheck id="privacy" />
        
        <div>
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-exertion-600 hover:bg-exertion-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje"}</span>
            <Send size={16} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
