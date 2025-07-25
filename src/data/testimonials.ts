
export interface Testimonial {
  id: number;
  content: string;
  author: string;
  title: string;
  avatar: string;
  rating: number;
  company: string;
  logo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Exertion Solutions implementó un sistema de gestión integral que transformó completamente nuestros procesos internos. La solución se adaptó perfectamente a nuestras necesidades y hemos logrado una visibilidad total de nuestras operaciones.",
    author: "Luciana Mendoza",
    title: "CTO, Grupo Industrial Argentino",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    company: "Grupo Industrial Argentino",
    logo: "https://placehold.co/200x80/e4e4e7/71717a?text=GIA&font=opensans"
  },
  {
    id: 2,
    content: "La mejora en nuestro sistema de gestión implementada por Exertion ha sido fundamental para nuestro crecimiento. La optimización de procesos y la integración de módulos personalizados nos permitió reducir costos operativos en un 25%.",
    author: "Martín Rodríguez",
    title: "Director de Operaciones, Finanzas del Sur",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    company: "Finanzas del Sur",
    logo: "https://placehold.co/200x80/e4e4e7/71717a?text=FdS&font=opensans"
  },
  {
    id: 3,
    content: "Gracias a Exertion logramos obtener la certificación ISO 9001 para nuestro sistema de gestión. Su asesoramiento y las herramientas implementadas fueron claves para cumplir con todos los requisitos normativos en tiempo récord.",
    author: "Gabriela Fernández",
    title: "Gerente de TI, Salud Integral",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    company: "Salud Integral",
    logo: "https://placehold.co/200x80/e4e4e7/71717a?text=Salud+Integral&font=opensans"
  },
  {
    id: 4,
    content: "La transformación digital que Exertion Solutions implementó en nuestra empresa revolucionó la forma de trabajar. Pasamos de procesos manuales a un ecosistema totalmente digital, mejorando la eficiencia y la comunicación interna.",
    author: "Diego Bianchi",
    title: "CEO, Logística Pampeana",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 5,
    company: "Logística Pampeana",
    logo: "https://placehold.co/200x80/e4e4e7/71717a?text=LP&font=opensans"
  },
  {
    id: 5,
    content: "La automatización de procesos en nuestro sistema de gestión desarrollada por Exertion nos permitió reducir errores humanos y ahorrar más de 30 horas semanales en tareas administrativas. Una inversión que se pagó sola en menos de 6 meses.",
    author: "Valentina Gómez",
    title: "Oficial de Seguridad, SegurData",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    rating: 5,
    company: "SegurData",
    logo: "https://placehold.co/200x80/e4e4e7/71717a?text=SegurData&font=opensans"
  }
];
