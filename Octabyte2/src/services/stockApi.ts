import axios from 'axios';
import { ApiResponse } from '../types/portfolio';

// Mock API service that simulates real-time stock data
// In production, this would integrate with actual financial APIs
export class StockApiService {
  private static instance: StockApiService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  static getInstance(): StockApiService {
    if (!StockApiService.instance) {
      StockApiService.instance = new StockApiService();
    }
    return StockApiService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private simulateMarketMovement(basePrice: number): number {
    // Simulate realistic market movements (-3% to +3%)
    const volatility = 0.03;
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    return Math.round(basePrice * (1 + randomChange) * 100) / 100;
  }

  async fetchCurrentPrice(symbol: string, basePrice: number): Promise<ApiResponse> {
    try {
      const cacheKey = `price_${symbol}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && this.isCacheValid(cached.timestamp)) {
        return { success: true, data: cached.data };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

      // In production, this would be:
      // const response = await axios.get(`https://yahoo-finance-api.com/quote/${symbol}`);
      
      const simulatedPrice = this.simulateMarketMovement(basePrice);
      const data = {
        symbol,
        price: simulatedPrice,
        change: simulatedPrice - basePrice,
        changePercent: ((simulatedPrice - basePrice) / basePrice) * 100,
        timestamp: new Date().toISOString()
      };

      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return { success: true, data };
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      return { 
        success: false, 
        error: `Failed to fetch price for ${symbol}` 
      };
    }
  }

  async fetchFinancialData(symbol: string, basePE: number, baseEarnings: number): Promise<ApiResponse> {
    try {
      const cacheKey = `financial_${symbol}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && this.isCacheValid(cached.timestamp)) {
        return { success: true, data: cached.data };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 300));

      // In production, this would be:
      //  const response = await axios.get(`https://google-finance-api.com/financials/${symbol}`);
      
      const data = {
        symbol,
        peRatio: Math.round((basePE + (Math.random() - 0.5) * 2) * 100) / 100,
        latestEarnings: Math.round((baseEarnings + (Math.random() - 0.5) * baseEarnings * 0.1) * 100) / 100,
        timestamp: new Date().toISOString()
      };

      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return { success: true, data };
    } catch (error) {
      console.error(`Error fetching financial data for ${symbol}:`, error);
      return { 
        success: false, 
        error: `Failed to fetch financial data for ${symbol}` 
      };
    }
  }

  async fetchBatchPrices(symbols: { symbol: string; basePrice: number }[]): Promise<Map<string, number>> {
    const results = new Map<string, number>();
    
    // Batch requests with throttling to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const promises = batch.map(({ symbol, basePrice }) => 
        this.fetchCurrentPrice(symbol, basePrice)
      );
      
      const responses = await Promise.allSettled(promises);
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled' && response.value.success) {
          results.set(batch[index].symbol, response.value.data.price);
        }
      });
      
      // Add delay between batches
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

export const stockApi = StockApiService.getInstance();