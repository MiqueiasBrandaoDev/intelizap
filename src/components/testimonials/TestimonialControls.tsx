
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialControlsProps {
  handlePrev: () => void;
  handleNext: () => void;
  isAnimating: boolean;
}

export const TestimonialDesktopControls = ({
  handlePrev,
  handleNext,
  isAnimating,
}: TestimonialControlsProps) => {
  return (
    <>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 hidden md:block">
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-exertion-50 dark:hover:bg-gray-600 transition-colors"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 hidden md:block">
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-exertion-50 dark:hover:bg-gray-600 transition-colors"
          aria-label="Siguiente testimonio"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
};

export const TestimonialMobileControls = ({
  handlePrev,
  handleNext,
  isAnimating,
}: TestimonialControlsProps) => {
  return (
    <div className="flex justify-center mt-6 space-x-4 md:hidden">
      <button
        onClick={handlePrev}
        disabled={isAnimating}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 shadow flex items-center justify-center text-gray-700 dark:text-gray-200"
      >
        <ChevronLeft size={16} className="mr-1" />
        <span>Anterior</span>
      </button>
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 shadow flex items-center justify-center text-gray-700 dark:text-gray-200"
      >
        <span>Siguiente</span>
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};
