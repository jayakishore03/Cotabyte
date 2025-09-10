# Dynamic Portfolio Dashboard

A comprehensive portfolio tracking application built with React, TypeScript, and Tailwind CSS that provides real-time insights into stock investments.

## Features

### Core Functionality
- **Real-time Portfolio Tracking**: Live updates of stock prices every 15 seconds
- **Sector-wise Analysis**: Grouped view of investments by sector (Financial, Technology, Consumer, Power, Infrastructure)
- **Interactive Dashboard**: Expandable sector summaries with detailed stock information
- **Visual Indicators**: Color-coded gains/losses with trending icons
- **Comprehensive Metrics**: P/E ratios, latest earnings, and performance indicators

### Technical Highlights
- **Modern React Architecture**: Built with React 18, TypeScript, and functional components
- **Advanced Table Management**: Using @tanstack/react-table for sophisticated data display
- **Data Visualization**: Interactive pie charts using Recharts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Caching, memoization, and efficient re-renders
- **Error Handling**: Graceful error states with retry mechanisms

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Data Tables**: @tanstack/react-table
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PortfolioHeader.tsx
│   ├── SectorSummary.tsx
│   ├── PortfolioTable.tsx
│   ├── SectorChart.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── hooks/              # Custom React hooks
│   └── usePortfolioData.ts
├── services/           # API and external services
│   └── stockApi.ts
├── types/              # TypeScript type definitions
│   └── portfolio.ts
├── utils/              # Utility functions
│   └── formatters.ts
├── data/               # Static data and configurations
│   └── portfolioData.ts
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration Strategy

### Current Implementation
The application uses a sophisticated mock API service that simulates real-world financial data APIs:

- **Price Simulation**: Realistic market movements with volatility modeling
- **Caching Strategy**: 30-second cache duration to optimize performance
- **Batch Processing**: Efficient handling of multiple stock requests
- **Error Handling**: Comprehensive error management with fallback strategies

### Production Integration
For production deployment, replace the mock service with actual financial APIs:

#### Yahoo Finance Integration
```typescript
// Example implementation for Yahoo Finance
async fetchCurrentPrice(symbol: string): Promise<ApiResponse> {
  try {
    // Note: Yahoo Finance doesn't have an official public API
    // Options include:
    // 1. Yahoo Finance Unofficial API (npm: yahoo-finance2)
    // 2. Alpha Vantage API (official, with rate limits)
    // 3. Financial Modeling Prep API
    // 4. IEX Cloud API
    
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch price data' };
  }
}
```

#### Google Finance Integration
```typescript
// Example implementation for Google Finance
async fetchFinancialData(symbol: string): Promise<ApiResponse> {
  try {
    // Google Finance requires web scraping or unofficial APIs
    // Recommended approach: Use Financial Modeling Prep or Alpha Vantage
    // for P/E ratios and earnings data
    
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/ratios/${symbol}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch financial data' };
  }
}
```

## Key Features Explained

### 1. Real-time Updates
- Automatic price refresh every 15 seconds
- Batch API requests to optimize performance
- Smart caching to reduce API calls

### 2. Sector Analysis
- Dynamic grouping by investment sectors
- Expandable/collapsible sector views
- Sector-wise performance metrics

### 3. Visual Indicators
- Green/red color coding for gains and losses
- Trending arrows for price movements
- Star indicators for Stage 2 stocks
- Warning icons for high P/E ratios

### 4. Performance Optimization
- React.memo for preventing unnecessary re-renders
- Efficient state management with custom hooks
- Optimized table rendering with virtualization support

### 5. Error Handling
- Graceful API failure handling
- User-friendly error messages
- Retry mechanisms for failed requests

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## Technical Challenges Addressed

### 1. API Limitations
- **Solution**: Implemented robust mock service with realistic data simulation
- **Production Strategy**: Multiple API provider fallbacks and rate limiting

### 2. Real-time Data Management
- **Solution**: Custom hook with automatic updates and caching
- **Performance**: Batch requests and intelligent cache invalidation

### 3. Complex Data Transformations
- **Solution**: Centralized calculation logic with memoization
- **Maintainability**: Clear separation of concerns and type safety

### 4. User Experience
- **Solution**: Loading states, error handling, and smooth transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Future Enhancements

1. **WebSocket Integration**: Real-time updates without polling
2. **Advanced Charting**: Historical performance charts and technical indicators
3. **Portfolio Analytics**: Risk analysis and diversification metrics
4. **Mobile App**: React Native version for mobile platforms
5. **Backend Integration**: Node.js API with database persistence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.