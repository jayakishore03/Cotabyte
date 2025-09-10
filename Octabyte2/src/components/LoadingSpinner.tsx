import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-gray-600 font-medium">{message}</span>
      </div>
    </div>
  );
};