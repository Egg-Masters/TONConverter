import React, { useEffect } from 'react';
import AppHeader from './components/AppHeader';
import AddressConverter from './components/AddressConverter';
import AppFooter from './components/AppFooter';

function App() {
  // Initialize dark mode based on user preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 flex flex-col transition-colors duration-300">
      <AppHeader title="TON Address Converter" />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl animate-fadeIn">
          <AddressConverter />
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
}

export default App;