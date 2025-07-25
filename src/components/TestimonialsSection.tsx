
import React from "react";
import TestimonialItem from "./testimonials/TestimonialItem";
import { TestimonialDesktopControls, TestimonialMobileControls } from "./testimonials/TestimonialControls";
import TestimonialDots from "./testimonials/TestimonialDots";
import { testimonials } from "@/data/testimonials";
import { useTestimonialCarousel } from "@/hooks/useTestimonialCarousel";

const TestimonialsSection = () => {
  const { currentIndex, isAnimating, handlePrev, handleNext, goToSlide } = 
    useTestimonialCarousel(testimonials.length);

  return (
    <section className="section-data section-padding relative overflow-hidden py-10">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-exertion-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-700/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-exertion-900/30 text-exertion-400 rounded-full text-sm font-medium mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            Descubre cómo nuestras soluciones empresariales han ayudado a negocios como el tuyo a lograr resultados notables.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel controls */}
          <TestimonialDesktopControls 
            handlePrev={handlePrev} 
            handleNext={handleNext} 
            isAnimating={isAnimating} 
          />

          {/* Testimonials carousel */}
          <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialItem
                  key={testimonial.id}
                  content={testimonial.content}
                  author={testimonial.author}
                  title={testimonial.title}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating}
                  company={testimonial.company}
                  logo={testimonial.logo}
                />
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <TestimonialDots 
            items={testimonials} 
            currentIndex={currentIndex} 
            goToSlide={goToSlide} 
            isAnimating={isAnimating}
          />

          {/* Mobile navigation buttons */}
          <TestimonialMobileControls 
            handlePrev={handlePrev} 
            handleNext={handleNext} 
            isAnimating={isAnimating} 
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
