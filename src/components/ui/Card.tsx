import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  footer
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-xl shadow-md overflow-hidden 
      border border-gray-100 dark:border-gray-700
      backdrop-blur-sm 
      transition-all duration-200
      ${className}
    `}>
      {(title || description) && (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;