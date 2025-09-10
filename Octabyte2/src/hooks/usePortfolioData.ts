import { useState, useEffect, useCallback } from 'react';
import { Stock, SectorSummary, PortfolioData } from '../types/portfolio';
import { stockApi } from '../services/stockApi';
import { initialPortfolioData } from '../data/portfolioData';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    stocks: initialPortfolioData,
    sectorSummaries: [],
    totalInvestment: 0,
    totalPresentValue: 0,
    totalGainLoss: 0,
    totalGainLossPercentage: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const calculatePortfolioMetrics = useCallback((stocks: Stock[]): PortfolioData => {
    // Group by sector
    const sectorMap = new Map<string, Stock[]>();
    stocks.forEach(stock => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, []);
      }
      sectorMap.get(stock.sector)!.push(stock);
    });

    // Calculate sector summaries
    const sectorSummaries: SectorSummary[] = Array.from(sectorMap.entries()).map(([sector, sectorStocks]) => {
      const totalInvestment = sectorStocks.reduce((sum, stock) => sum + stock.investment, 0);
      const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + stock.presentValue, 0);
      const totalGainLoss = totalPresentValue - totalInvestment;
      const gainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

      return {
        sector,
        totalInvestment,
        totalPresentValue,
        totalGainLoss,
        gainLossPercentage,
        stocks: sectorStocks
      };
    });

    // Calculate total portfolio metrics
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const totalGainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

    return {
      stocks,
      sectorSummaries,
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      totalGainLossPercentage
    };
  }, []);

  const updateStockPrices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const symbols = portfolioData.stocks.map(stock => ({
        symbol: stock.nseCode,
        basePrice: stock.cmp
      }));

      const updatedPrices = await stockApi.fetchBatchPrices(symbols);
      
      const updatedStocks = portfolioData.stocks.map(stock => {
        const newPrice = updatedPrices.get(stock.nseCode);
        if (newPrice) {
          const presentValue = newPrice * stock.quantity;
          const gainLoss = presentValue - stock.investment;
          const gainLossPercentage = stock.investment > 0 ? (gainLoss / stock.investment) * 100 : 0;

          return {
            ...stock,
            cmp: newPrice,
            presentValue,
            gainLoss,
            gainLossPercentage
          };
        }
        return stock;
      });

      const newPortfolioData = calculatePortfolioMetrics(updatedStocks);
      setPortfolioData(newPortfolioData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to update stock prices. Please try again.');
      console.error('Error updating stock prices:', err);
    } finally {
      setLoading(false);
    }
  }, [portfolioData.stocks, calculatePortfolioMetrics]);

  // Initialize portfolio data
  useEffect(() => {
    const initialData = calculatePortfolioMetrics(initialPortfolioData);
    setPortfolioData(initialData);
  }, [calculatePortfolioMetrics]);

  // Set up automatic updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(updateStockPrices, 15000);
    return () => clearInterval(interval);
  }, [updateStockPrices]);

  const refreshData = useCallback(() => {
    updateStockPrices();
  }, [updateStockPrices]);

  return {
    portfolioData,
    loading,
    error,
    lastUpdated,
    refreshData
  };
};