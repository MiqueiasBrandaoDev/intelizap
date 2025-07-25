
import { useState } from "react";
import { sendConsultationEmail, useEmailService, ConsultationFormData } from "@/services/emailService";
import { useToast } from "@/hooks/use-toast";

interface ConsultationFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const useConsultationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { handleEmailSuccess, handleEmailError } = useEmailService();
  
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<ConsultationFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ConsultationFormErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar el error cuando el usuario escribe
    if (errors[name as keyof ConsultationFormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ConsultationFormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Por favor complete todos los campos requeridos",
        description: "Hay errores en el formulario que debe corregir",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const success = await sendConsultationEmail(formData);

      if (success) {
        handleEmailSuccess();
        // Limpiar el formulario
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: ""
        });
      } else {
        handleEmailError();
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      handleEmailError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
