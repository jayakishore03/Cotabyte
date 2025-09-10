import React, { useState } from 'react';
import { PortfolioHeader } from './components/PortfolioHeader';
import { SectorSummary } from './components/SectorSummary';
import { PortfolioTable } from './components/PortfolioTable';
import { SectorChart } from './components/SectorChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const { portfolioData, loading, error, lastUpdated, refreshData } = usePortfolioData();
  const [expandedSectors, setExpandedSectors] = useState<Set<string>>(new Set());

  const toggleSector = (sector: string) => {
    const newExpanded = new Set(expandedSectors);
    if (newExpanded.has(sector)) {
      newExpanded.delete(sector);
    } else {
      newExpanded.add(sector);
    }
    setExpandedSectors(newExpanded);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage message={error} onRetry={refreshData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <PortfolioHeader
          portfolioData={portfolioData}
          loading={loading}
          lastUpdated={lastUpdated}
          onRefresh={refreshData}
        />

        {/* Chart on the left, summaries on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left side - Sector Chart */}
          <div className="lg:col-span-1">
            <SectorChart sectorSummaries={portfolioData.sectorSummaries} />
          </div>

          {/* Right side - Sector summaries and tables */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {portfolioData.sectorSummaries.map(sectorSummary => (
                <div key={sectorSummary.sector}>
                  <SectorSummary
                    sectorSummary={sectorSummary}
                    isExpanded={expandedSectors.has(sectorSummary.sector)}
                    onToggle={() => toggleSector(sectorSummary.sector)}
                  />

                  {expandedSectors.has(sectorSummary.sector) && (
                    <div className="mt-2">
                      <PortfolioTable 
                        stocks={sectorSummary.stocks} 
                        loading={loading}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Holdings Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">All Holdings</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Stage 2 Stock</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Gains</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>Losses</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <PortfolioTable stocks={portfolioData.stocks} loading={loading} />
          </div>
        </div>

        {/* Technical Notes */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Data Sources</h4>
              <ul className="space-y-1">
                <li>• Current Market Price (CMP): Simulated Yahoo Finance API</li>
                <li>• P/E Ratio & Earnings: Simulated Google Finance API</li>
                <li>• Updates every 15 seconds automatically</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Features</h4>
              <ul className="space-y-1">
                <li>• Real-time price updates with market simulation</li>
                <li>• Sector-wise grouping and analysis</li>
                <li>• Interactive table with sorting capabilities</li>
                <li>• Visual indicators for gains/losses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
