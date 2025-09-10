import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SectorSummary } from '../types/portfolio';
import { formatCurrency } from '../utils/formatters';

interface SectorChartProps {
  sectorSummaries: SectorSummary[];
}

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
];

export const SectorChart: React.FC<SectorChartProps> = ({ sectorSummaries }) => {
  const chartData = sectorSummaries.map((sector, index) => ({
    name: sector.sector,
    value: sector.totalPresentValue,
    investment: sector.totalInvestment,
    gainLoss: sector.totalGainLoss,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold text-gray-900">{data.name} Sector</p>
          <p className="text-sm text-gray-600">
            Present Value: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">
            Investment: {formatCurrency(data.investment)}
          </p>
          <p
            className={`text-sm font-medium ${
              data.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Gain/Loss: {formatCurrency(data.gainLoss)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Sector Allocation</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
