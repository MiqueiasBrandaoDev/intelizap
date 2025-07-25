
import React from "react";

interface TestimonialDotsProps {
  items: any[];
  currentIndex: number;
  goToSlide: (index: number) => void;
  isAnimating: boolean;
}

const TestimonialDots = ({
  items,
  currentIndex,
  goToSlide,
  isAnimating,
}: TestimonialDotsProps) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => !isAnimating && goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === currentIndex
              ? "bg-exertion-500"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
          aria-label={`Ir al testimonio ${index + 1}`}
        ></button>
      ))}
    </div>
  );
};

export default TestimonialDots;
