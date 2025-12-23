'use client';

import React from 'react';
import {
  ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';

interface SalesDataPoint {
  month: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
  chartType: 'bar' | 'line' | 'pie';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
        <p className="font-bold text-cyan-400">{label}</p>
        <p className="text-sm">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'];

const SalesChart: React.FC<SalesChartProps> = ({ data, chartType }) => {

  if (!data || data.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available for the selected filters.</p>
        </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }} />
            <Legend wrapperStyle={{ color: '#d1d5db' }}/>
            <Line type="monotone" dataKey="sales" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
          </LineChart>
        );
      case 'pie':
        return (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#d1d5db' }}/>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="sales"
                nameKey="month"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(value) => `$${Number(value) / 1000}k`}/>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}/>
            <Legend wrapperStyle={{ color: '#d1d5db' }}/>
            <Bar dataKey="sales" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  );
};

export default SalesChart;