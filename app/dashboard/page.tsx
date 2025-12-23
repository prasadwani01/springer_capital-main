'use client';

import React, { useState, useMemo } from 'react';
import SalesChart from '@/components/ui/SalesChart';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

const salesData = [
  {
    year: 2022,
    data: [
      { month: 'Jan', sales: 1120 }, { month: 'Feb', sales: 1350 }, { month: 'Mar', sales: 1480 },
      { month: 'Apr', sales: 1600 }, { month: 'May', sales: 1750 }, { month: 'Jun', sales: 1890 },
      { month: 'Jul', sales: 2050 }, { month: 'Aug', sales: 2200 }, { month: 'Sep', sales: 2400 },
      { month: 'Oct', sales: 2650 }, { month: 'Nov', sales: 2800 }, { month: 'Dec', sales: 3000 },
    ],
  },
  {
    year: 2023,
    data: [
      { month: 'Jan', sales: 2400 }, { month: 'Feb', sales: 2250 }, { month: 'Mar', sales: 2600 },
      { month: 'Apr', sales: 2850 }, { month: 'May', sales: 3050 }, { month: 'Jun', sales: 2900 },
      { month: 'Jul', sales: 3150 }, { month: 'Aug', sales: 3300 }, { month: 'Sep', sales: 3500 },
      { month: 'Oct', sales: 3700 }, { month: 'Nov', sales: 3950 }, { month: 'Dec', sales: 4200 },
    ],
  },
  {
    year: 2024,
    data: [
      { month: 'Jan', sales: 3100 }, { month: 'Feb', sales: 3300 }, { month: 'Mar', sales: 3550 },
      { month: 'Apr', sales: 3400 }, { month: 'May', sales: 3800 }, { month: 'Jun', sales: 4100 },
      { month: 'Jul', sales: 4350 }, { month: 'Aug', sales: 4500 }, { month: 'Sep', sales: 4800 },
      { month: 'Oct', sales: 5100 }, { month: 'Nov', sales: 5400 }, { month: 'Dec', sales: 5800 },
    ],
  },
];

type ChartType = 'bar' | 'line' | 'pie';

const DashboardPage = () => {
  const [year, setYear] = useState(2024);
  const [threshold, setThreshold] = useState('');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const filteredData = useMemo(() => {
    const selectedYearData = salesData.find((d) => d.year === year)?.data || [];
    const numericThreshold = Number(threshold);
    if (!numericThreshold) {
      return selectedYearData;
    }
    return selectedYearData.filter((d) => d.sales >= numericThreshold);
  }, [year, threshold]);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(e.target.value);
  };

  const ChartIcon = ({type}: {type: ChartType}) => {
    if (type === 'line') return <LineChart className="w-5 h-5 mr-2" />;
    if (type === 'pie') return <PieChart className="w-5 h-5 mr-2" />;
    return <BarChart className="w-5 h-5 mr-2" />;
  }

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold flex items-center">
          <TrendingUp className="w-10 h-10 mr-3 text-cyan-400" />
          Sales Dashboard
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          An overview of sales performance for the years 2022-2024.
        </p>
      </header>
      
      <div className="bg-card border border-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="year-select" className="font-semibold">Year:</label>
            <select
              id="year-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {salesData.map((d) => (
                <option key={d.year} value={d.year}>{d.year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="threshold-input" className="font-semibold">Sales Threshold:</label>
            <input
              id="threshold-input"
              type="number"
              value={threshold}
              onChange={handleThresholdChange}
              placeholder="e.g., 3000"
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 p-1 rounded-lg">
              {(['bar', 'line', 'pie'] as ChartType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`flex items-center capitalize px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        chartType === type
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                   <ChartIcon type={type}/>
                   {type}
                  </button>
              ))}
          </div>
        </div>

        <div className="w-full h-[500px]">
          <SalesChart data={filteredData} chartType={chartType} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;