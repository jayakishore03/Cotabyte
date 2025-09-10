import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import { TrendingUp, TrendingDown, Star, AlertTriangle, RefreshCw } from 'lucide-react';
import { Stock } from '../types/portfolio';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface PortfolioTableProps {
  stocks: Stock[];
  loading?: boolean;
}

const columnHelper = createColumnHelper<Stock>();

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ stocks, loading }) => {
  const columns = useMemo<ColumnDef<Stock, any>[]>(() => [
    // Stock Column
    columnHelper.accessor('particulars', {
      header: 'Stock',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {row.original.stage2 ? (
              <Star className="w-5 h-5 text-amber-500 fill-current drop-shadow-sm" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="font-semibold text-indigo-900">{row.original.particulars}</div>
            <div className="text-sm text-gray-500">{row.original.nseCode}</div>
          </div>
        </div>
      ),
    }),

    // Purchase Price
    columnHelper.accessor('purchasePrice', {
      header: 'Purchase Price',
      cell: ({ getValue }) => (
        <span className="font-medium text-sky-700">{formatCurrency(getValue())}</span>
      ),
    }),

    // Quantity
    columnHelper.accessor('quantity', {
      header: 'Qty',
      cell: ({ getValue }) => (
        <span className="font-medium text-purple-700">{getValue()}</span>
      ),
    }),

    // Investment
    columnHelper.accessor('investment', {
      header: 'Investment',
      cell: ({ getValue }) => (
        <span className="font-semibold text-indigo-900">
          {formatCurrency(getValue())}
        </span>
      ),
    }),

    // Portfolio %
    columnHelper.accessor('portfolioPercentage', {
      header: 'Portfolio %',
      cell: ({ getValue }) => (
        <span className="font-medium text-emerald-700">{getValue()}%</span>
      ),
    }),

    // CMP with price change
    columnHelper.accessor('cmp', {
      header: 'CMP',
      cell: ({ getValue, row }) => {
        const currentPrice = getValue();
        const purchasePrice = row.original.purchasePrice;
        const priceChange = ((currentPrice - purchasePrice) / purchasePrice) * 100;
        const isPositive = priceChange >= 0;

        return (
          <div className="text-right">
            <div className="font-semibold text-indigo-900">
              {formatCurrency(currentPrice)}
            </div>
            <div
              className={`text-sm flex items-center justify-end space-x-1 ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{formatPercentage(priceChange)}</span>
            </div>
          </div>
        );
      },
    }),

    // Present Value
    columnHelper.accessor('presentValue', {
      header: 'Present Value',
      cell: ({ getValue }) => (
        <span className="font-semibold text-indigo-900">
          {formatCurrency(getValue())}
        </span>
      ),
    }),

    // Gain / Loss
    columnHelper.accessor('gainLoss', {
      header: 'Gain/Loss',
      cell: ({ getValue, row }) => {
        const gainLoss = getValue();
        const gainLossPercentage = row.original.gainLossPercentage;
        const isPositive = gainLoss >= 0;

        return (
          <div className="text-right">
            <div
              className={`font-semibold flex items-center justify-end space-x-1 ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{formatCurrency(gainLoss)}</span>
            </div>
            <div className={`text-sm ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {formatPercentage(gainLossPercentage)}
            </div>
          </div>
        );
      },
    }),

    // P/E Ratio
    columnHelper.accessor('peRatio', {
      header: 'P/E Ratio',
      cell: ({ getValue }) => {
        const peRatio = getValue();
        const isHigh = peRatio && peRatio > 50;

        return (
          <div className="flex items-center space-x-1">
            {isHigh && <AlertTriangle className="w-4 h-4 text-amber-500" />}
            <span
              className={`font-medium ${
                isHigh ? 'text-amber-600' : 'text-gray-700'
              }`}
            >
              {peRatio ? peRatio.toFixed(2) : 'N/A'}
            </span>
          </div>
        );
      },
    }),

    // Latest Earnings
    columnHelper.accessor('latestEarnings', {
      header: 'Latest Earnings',
      cell: ({ getValue }) => (
        <span className="font-medium text-indigo-700">
          {getValue() ? formatCurrency(getValue()!) : 'N/A'}
        </span>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
            <span className="text-gray-700 font-medium">Updating prices...</span>
          </div>
        </div>
      )}
    </div>
  );
};
