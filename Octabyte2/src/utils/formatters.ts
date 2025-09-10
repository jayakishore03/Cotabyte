export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const getGainLossColor = (gainLoss: number): string => {
  return gainLoss >= 0 ? 'text-green-600' : 'text-red-600';
};

export const getGainLossBgColor = (gainLoss: number): string => {
  return gainLoss >= 0 ? 'bg-green-50' : 'bg-red-50';
};