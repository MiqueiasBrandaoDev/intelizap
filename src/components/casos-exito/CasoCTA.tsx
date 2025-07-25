
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { sendConsultationEmail, useEmailService } from "@/services/emailService";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleEmailSuccess, handleEmailError } = useEmailService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendConsultationEmail({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      });

      if (success) {
        handleEmailSuccess();
        // Limpiar el formulario
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
        // Cerrar el diálogo después de 1 segundo para que el usuario vea el mensaje
        setTimeout(() => {
          document.body.click(); // Hack para cerrar el diálogo
        }, 1000);
      } else {
        handleEmailError();
      }
    } catch (error) {
      handleEmailError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-200 mb-1">
          Nombre Completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-200 mb-1">
          Correo Electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-zinc-200 mb-1">
          Empresa
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-200 mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100"
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-exertion-600 hover:bg-exertion-700 text-white font-medium rounded-lg flex items-center justify-center"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Enviando..." : "Solicitar Consulta"}</span>
        {isSubmitting ? (
          <div className="ml-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <Send size={16} className="ml-2" />
        )}
      </button>
    </form>
  );
};

const CasoCTA = () => {
  return (
    <div className="mt-12 bg-zinc-800 dark:bg-zinc-900 rounded-xl p-8 border border-zinc-700 dark:border-zinc-800">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-zinc-100">¿Quieres resultados similares para tu empresa?</h3>
        <p className="text-zinc-300 dark:text-zinc-300 mb-6 max-w-3xl mx-auto">
          Permítanos ayudarle a transformar su empresa con nuestras soluciones personalizadas de gestión y automatización.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/contacto">
            <Button className="bg-zinc-700 hover:bg-zinc-600 text-white">
              Ir a Contacto
              <ChevronRight size={16} />
            </Button>
          </Link>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-exertion-600 hover:bg-exertion-700 text-white">
                Solicitar Consulta
                <Send size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100 border-zinc-700">
              <DialogHeader>
                <DialogTitle className="text-zinc-100">Solicitar Consulta</DialogTitle>
              </DialogHeader>
              <ConsultationForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CasoCTA;
