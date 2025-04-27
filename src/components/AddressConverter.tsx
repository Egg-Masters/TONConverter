import React, { useState, useEffect } from 'react';
import { Copy, ArrowDownUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import InputField from './ui/InputField';
import { AddressType, isValidRawAddress, isValidUserFriendlyAddress, simplifiedConversion } from '../utils/tonAddressConverter';

const AddressConverter: React.FC = () => {
  const [rawAddress, setRawAddress] = useState('');
  const [userFriendlyAddress, setUserFriendlyAddress] = useState('');
  const [conversionDirection, setConversionDirection] = useState<'rawToUser' | 'userToRaw'>('rawToUser');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Sample address for demo purposes
  const sampleRawAddress = '0:189226288820c4a3fff71c20d02e040e7c167f349846b1cf3bf05176a2aea142';
  const sampleUserFriendlyAddress = 'UQAYkiYoiCDEo__3HCDQLgQOfBZ_NJhGsc878FF2oq6hQvUB';

  // Reset error when input changes
  useEffect(() => {
    setError('');
    setCopySuccess(null);
  }, [rawAddress, userFriendlyAddress, conversionDirection]);

  const handleConvert = () => {
    setError('');
    setCopySuccess(null);
    setIsConverting(true);
    
    // Add a slight delay to show the loading state
    setTimeout(() => {
      try {
        if (conversionDirection === 'rawToUser') {
          if (!rawAddress) {
            setError('Please enter a raw address');
            setIsConverting(false);
            return;
          }
          
          if (!isValidRawAddress(rawAddress)) {
            setError('Invalid raw address format. Expected format: <workchain>:<64 hex characters>');
            setIsConverting(false);
            return;
          }
          
          const result = simplifiedConversion.rawToUserFriendly(rawAddress);
          setUserFriendlyAddress(result);
        } else {
          if (!userFriendlyAddress) {
            setError('Please enter a user-friendly address');
            setIsConverting(false);
            return;
          }
          
          if (!isValidUserFriendlyAddress(userFriendlyAddress)) {
            setError('Invalid user-friendly address format');
            setIsConverting(false);
            return;
          }
          
          const result = simplifiedConversion.userFriendlyToRaw(userFriendlyAddress);
          setRawAddress(result);
        }
        
        setIsConverting(false);
      } catch (err) {
        setError('Conversion failed. Please check your input.');
        setIsConverting(false);
      }
    }, 500);
  };

  const handleToggleDirection = () => {
    setConversionDirection(prev => prev === 'rawToUser' ? 'userToRaw' : 'rawToUser');
    setError('');
    setCopySuccess(null);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const handleUseSample = () => {
    if (conversionDirection === 'rawToUser') {
      setRawAddress(sampleRawAddress);
      setUserFriendlyAddress('');
    } else {
      setUserFriendlyAddress(sampleUserFriendlyAddress);
      setRawAddress('');
    }
    setError('');
    setCopySuccess(null);
  };

  const handleClear = () => {
    setRawAddress('');
    setUserFriendlyAddress('');
    setError('');
    setCopySuccess(null);
  };

  return (
    <Card 
      title="TON Wallet Address Converter"
      description="Convert between raw and user-friendly TON wallet address formats"
      className="max-w-2xl w-full mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg"
    >
      <div className="space-y-6">
        {conversionDirection === 'rawToUser' ? (
          <>
            <InputField
              label="Raw Address"
              placeholder="Enter raw address (0:...)"
              value={rawAddress}
              onChange={(e) => setRawAddress(e.target.value)}
              fullWidth
              error={conversionDirection === 'rawToUser' && error ? error : ''}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleToggleDirection}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle conversion direction"
              >
                <ArrowDownUp className="text-gray-600 dark:text-gray-300" size={20} />
              </button>
            </div>
            
            <div className="relative">
              <InputField
                label="User-Friendly Address"
                placeholder="Converted user-friendly address"
                value={userFriendlyAddress}
                readOnly
                fullWidth
              />
              
              {userFriendlyAddress && (
                <button
                  onClick={() => handleCopy(userFriendlyAddress, 'user')}
                  className="absolute right-2 top-8 p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="Copy to clipboard"
                >
                  {copySuccess === 'user' ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <InputField
              label="User-Friendly Address"
              placeholder="Enter user-friendly address"
              value={userFriendlyAddress}
              onChange={(e) => setUserFriendlyAddress(e.target.value)}
              fullWidth
              error={conversionDirection === 'userToRaw' && error ? error : ''}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleToggleDirection}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle conversion direction"
              >
                <ArrowDownUp className="text-gray-600 dark:text-gray-300" size={20} />
              </button>
            </div>
            
            <div className="relative">
              <InputField
                label="Raw Address"
                placeholder="Converted raw address"
                value={rawAddress}
                readOnly
                fullWidth
              />
              
              {rawAddress && (
                <button
                  onClick={() => handleCopy(rawAddress, 'raw')}
                  className="absolute right-2 top-8 p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="Copy to clipboard"
                >
                  {copySuccess === 'raw' ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            onClick={handleConvert}
            isLoading={isConverting}
            fullWidth
          >
            Convert
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleUseSample}
            fullWidth
          >
            Use Sample
          </Button>
          
          <Button 
            variant="ghost"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
        </div>

        <div className="mt-6 text-sm bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Address Format Info</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><span className="font-medium">Raw format:</span> workchain:hash (e.g., 0:189226288...)</li>
            <li><span className="font-medium">User-friendly format:</span> Base64 representation (e.g., UQAYki...)</li>
            <li>The user-friendly format is used in wallets and applications</li>
            <li>The raw format is often used in development and smart contracts</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default AddressConverter;