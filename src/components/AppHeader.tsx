import React from 'react';
import { Wallet } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    <header className="w-full py-4 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://ton.org/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
          >
            TON Docs
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;