import React from 'react';
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { SectorSummary as SectorSummaryType } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface SectorSummaryProps {
  sectorSummary: SectorSummaryType;
  isExpanded: boolean;
  onToggle: () => void;
}

export const SectorSummary: React.FC<SectorSummaryProps> = ({
  sectorSummary,
  isExpanded,
  onToggle
}) => {
  const isPositive = sectorSummary.totalGainLoss >= 0;

  return (
    <div className="bg-gray-50 border-l-4 border-blue-500">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {sectorSummary.sector} Sector
            </h3>
            <p className="text-sm text-gray-600">
              {sectorSummary.stocks.length} holdings
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm text-gray-600">Investment</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(sectorSummary.totalInvestment)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Present Value</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(sectorSummary.totalPresentValue)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Gain/Loss</p>
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <div>
                <p className={`font-semibold ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(sectorSummary.totalGainLoss)}
                </p>
                <p className={`text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(sectorSummary.gainLossPercentage)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};