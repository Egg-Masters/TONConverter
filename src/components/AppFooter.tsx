import React from 'react';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} TON Address Converter. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://ton.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              TON Network
            </a>
            <a 
              href="https://github.com/ton-blockchain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              GitHub
            </a>
            <a 
              href="https://t.me/tonblockchain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;