
import { useState } from "react";
import { sendNewsletterEmail, useEmailService } from "@/services/emailService";

export const useNewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleEmailSuccess, handleEmailError } = useEmailService();

  const validateEmail = (email: string) => {
    if (!email.trim()) return "El email es obligatorio";
    if (!/\S+@\S+\.\S+/.test(email)) return "El formato del email no es válido";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    
    if (emailError) {
      setError(emailError);
      return;
    }
    
    setIsSubmitting(true);
    try {
      console.log("Enviando newsletter email:", email);
      const success = await sendNewsletterEmail({ email });
      
      if (success) {
        handleEmailSuccess();
        setEmail("");
        setError(null);
      } else {
        handleEmailError();
      }
    } catch (error) {
      console.error("Error al enviar newsletter:", error);
      handleEmailError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    error,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
