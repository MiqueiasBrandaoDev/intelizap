
import emailjs from 'emailjs-com';
import { useToast } from "@/hooks/use-toast";

// Constantes para la configuración de EmailJS
const SERVICE_ID = 'default_service'; 
const TEMPLATE_ID_CONTACT = 'template_contact'; 
const TEMPLATE_ID_NEWSLETTER = 'template_newsletter'; 
const USER_ID = 'NrgDCx02ZlBYC--Ey'; // ID público de EmailJS configurado

// EmailJS initialization - Asegura que se inicializa correctamente
emailjs.init(USER_ID);

// Interfaces para los diferentes tipos de formularios
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
}

// Función para enviar emails de contacto
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone || 'No proporcionado',
    subject: formData.subject || 'Contacto desde web',
    company: formData.company || 'No proporcionado',
    service: formData.service || 'No especificado',
    message: formData.message,
    to_email: 'jcastro@exertionai.com',
    cc_email: 'jorge_e_castro@hotmail.com'
  };

  console.log('Enviando email de contacto:', templateParams);

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams);
    console.log('Email enviado con éxito:', response);
    return true;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return false;
  }
};

// Función para enviar emails de newsletter
export const sendNewsletterEmail = async (formData: NewsletterFormData): Promise<boolean> => {
  const templateParams = {
    email: formData.email,
    to_email: 'jcastro@exertionai.com',
    cc_email: 'jorge_e_castro@hotmail.com',
    message: `Nuevo suscriptor al newsletter: ${formData.email}`
  };

  console.log('Enviando email de newsletter:', templateParams);

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_NEWSLETTER, templateParams);
    console.log('Email de newsletter enviado con éxito:', response);
    return true;
  } catch (error) {
    console.error('Error al enviar el email de newsletter:', error);
    return false;
  }
};

// Función para enviar solicitudes de consulta
export const sendConsultationEmail = async (formData: ConsultationFormData): Promise<boolean> => {
  const templateParams = {
    name: formData.name,
    email: formData.email,
    company: formData.company || 'No proporcionado',
    service: formData.service || 'No especificado',
    message: formData.message || 'Solicitud de consulta',
    to_email: 'jcastro@exertionai.com',
    cc_email: 'jorge_e_castro@hotmail.com'
  };

  console.log('Enviando solicitud de consulta:', templateParams);

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, templateParams);
    console.log('Solicitud de consulta enviada con éxito:', response);
    return true;
  } catch (error) {
    console.error('Error al enviar la solicitud de consulta:', error);
    return false;
  }
};

// Hook personalizado para manejar envíos de emails con notificaciones
export const useEmailService = () => {
  const { toast } = useToast();

  const handleEmailSuccess = () => {
    toast({
      title: "¡Mensaje Enviado!",
      description: "Gracias por comunicarte con nosotros.",
      variant: "default",
    });
  };

  const handleEmailError = () => {
    toast({
      title: "Error al enviar el mensaje",
      description: "Por favor, inténtelo de nuevo más tarde.",
      variant: "destructive",
    });
  };

  return {
    handleEmailSuccess,
    handleEmailError
  };
};
