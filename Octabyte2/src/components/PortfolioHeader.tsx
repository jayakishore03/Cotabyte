import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, IndianRupee } from 'lucide-react'; 
import { PortfolioData } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface PortfolioHeaderProps {
  portfolioData: PortfolioData;
  loading: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  portfolioData,
  loading,
  lastUpdated,
  onRefresh
}) => {
  const isPositive = portfolioData.totalGainLoss >= 0;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-md">
            <IndianRupee className="w-8 h-8 text-white" /> 
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Portfolio Dashboard</h1>
            <p className="text-gray-300">Real-time portfolio tracking and analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-sm font-semibold text-gray-200">
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total Investment */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-300">Total Investment</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioData.totalInvestment)}
              </p>
            </div>
            <IndianRupee className="w-8 h-8 text-indigo-300" />
          </div>
        </div>

        {/* Present Value */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-300">Present Value</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioData.totalPresentValue)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-300" />
          </div>
        </div>

        {/* Gain/Loss */}
        <div className={`rounded-xl p-5 shadow-sm ${
          isPositive 
            ? 'bg-gradient-to-r from-emerald-700 to-green-900' 
            : 'bg-gradient-to-r from-rose-700 to-red-900'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isPositive ? 'text-emerald-300' : 'text-red-300'
              }`}>
                Total Gain/Loss
              </p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioData.totalGainLoss)}
              </p>
            </div>
            {isPositive ? (
              <TrendingUp className="w-8 h-8 text-emerald-300" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-300" />
            )}
          </div>
        </div>

        {/* Return % */}
        <div className={`rounded-xl p-5 shadow-sm ${
          isPositive 
            ? 'bg-gradient-to-r from-amber-700 to-orange-900' 
            : 'bg-gradient-to-r from-rose-700 to-red-900'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isPositive ? 'text-amber-300' : 'text-red-300'
              }`}>
                Return %
              </p>
              <p className="text-2xl font-bold text-white">
                {formatPercentage(portfolioData.totalGainLossPercentage)}
              </p>
            </div>
            {isPositive ? (
              <TrendingUp className="w-8 h-8 text-amber-300" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-300" />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
