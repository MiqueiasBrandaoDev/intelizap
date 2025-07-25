
import React from "react";
import { Quote } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  title: string;
  avatar: string;
  rating: number;
  company: string;
  logo: string;
}

const TestimonialItem = ({
  content,
  author,
  title,
  avatar,
  rating,
  company,
  logo,
}: TestimonialProps) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };

  return (
    <div className="w-full flex-shrink-0">
      <div className="p-2 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="md:w-1/3 flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mb-4">
              <img
                src={avatar}
                alt={author}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-semibold">{author}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {title}
            </p>
            <img
              src={logo}
              alt={company}
              className="h-8 object-contain my-2 opacity-80"
              loading="lazy"
            />
            <div className="flex items-center justify-center mt-2">
              {renderStars(rating)}
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="flex mb-4">
              <Quote size={40} className="text-exertion-400 opacity-50" />
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
