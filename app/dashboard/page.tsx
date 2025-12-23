"use client";

import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, BarChart3, Wallet, Settings, LogOut,
  Bell, Search, Menu, X, ChevronDown, Filter, Download,
  TrendingUp, Users, ShoppingBag, DollarSign, ChevronRight,
  MoreHorizontal, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// --- MOCK DATA ---
const chartData = [
  { name: 'Jan', revenue: 4200, profit: 2400, orders: 120 },
  { name: 'Feb', revenue: 3800, profit: 1398, orders: 98 },
  { name: 'Mar', revenue: 5200, profit: 3800, orders: 150 },
  { name: 'Apr', revenue: 4780, profit: 3908, orders: 135 },
  { name: 'May', revenue: 5890, profit: 4800, orders: 170 },
  { name: 'Jun', revenue: 6390, profit: 5100, orders: 190 },
  { name: 'Jul', revenue: 7100, profit: 5600, orders: 210 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 25 },
  { name: 'Groceries', value: 20 },
  { name: 'Home', value: 10 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

const initialTransactions = [
  { id: '#TRX-9821', customer: 'Alice Varma', date: 'Oct 18, 2023', amount: '12450', status: 'Completed', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: '#TRX-9822', customer: 'Rahul Sharma', date: 'Oct 18, 2023', amount: '8200', status: 'Pending', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
  { id: '#TRX-9823', customer: 'Priya Singh', date: 'Oct 17, 2023', amount: '4150', status: 'Completed', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: '#TRX-9824', customer: 'Sohan Gupta', date: 'Oct 17, 2023', amount: '22000', status: 'Cancelled', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sohan' },
  { id: '#TRX-9825', customer: 'Anita Roy', date: 'Oct 16, 2023', amount: '15300', status: 'Completed', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita' },
];

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [metricMode, setMetricMode] = useState('revenue');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter Logic for Table
  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter(tx => {
      const matchesSearch = tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">S</div>
            <span className="text-xl font-bold tracking-wide">Springer</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: Wallet, label: 'Transactions', active: false },
            { icon: Users, label: 'Customers', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item, idx) => (
            <button key={idx} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-600">
            <Menu size={24} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200 w-96 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-slate-400"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700">Prasad Wani</p>
                <p className="text-xs text-slate-500">Admin Account</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Prasad" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Enterprise Dashboard</h1>
              <p className="text-slate-500 text-sm mt-1">Comprehensive system performance and business metrics.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50">
                <Download size={16} /> Export Reports
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                <TrendingUp size={16} /> Advanced Analytics
              </button>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Revenue', value: '₹84,245', change: 14.2, icon: DollarSign, color: 'indigo' },
              { label: 'Total Orders', value: '1,240', change: -2.4, icon: ShoppingBag, color: 'rose' },
              { label: 'New Customers', value: '342', change: 8.1, icon: Users, color: 'emerald' },
              { label: 'Growth Rate', value: '24.5%', change: 4.3, icon: TrendingUp, color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Interactive Area Chart */}
            <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Performance Analytics</h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setMetricMode('revenue')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${metricMode === 'revenue' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Revenue
                  </button>
                  <button 
                    onClick={() => setMetricMode('profit')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${metricMode === 'profit' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Profit
                  </button>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metricMode === 'revenue' ? '#6366f1' : '#10b981'} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={metricMode === 'revenue' ? '#6366f1' : '#10b981'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                        cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={metricMode} 
                      stroke={metricMode === 'revenue' ? '#6366f1' : '#10b981'} 
                      strokeWidth={3} 
                      fill="url(#colorMetric)" 
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="font-bold text-lg mb-4 text-center xl:text-left">Sector Distribution</h2>
              <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={categoryData} 
                      innerRadius={65} 
                      outerRadius={85} 
                      paddingAngle={5} 
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-2xl font-bold text-slate-800">100%</span>
                  <span className="text-xs text-slate-400">Total Share</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Transaction Table */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-bold text-lg">Detailed Transactions</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-60"
                  />
                </div>
                {/* Status Filter */}
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4 font-semibold">User Profile</th>
                    <th className="px-6 py-4 font-semibold">Processed Date</th>
                    <th className="px-6 py-4 font-semibold">Net Amount</th>
                    <th className="px-6 py-4 font-semibold">Lifecycle Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={tx.img} alt={tx.customer} className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200" />
                            <div>
                              <p className="font-bold text-sm text-slate-900">{tx.customer}</p>
                              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{tx.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">{tx.date}</td>
                        <td className="px-6 py-4 font-bold text-sm text-slate-900">₹{parseInt(tx.amount).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                           <Search size={40} className="text-slate-200 mb-2" />
                           <p className="text-slate-500 font-medium">No results found for your query.</p>
                           <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or search keywords.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-center">
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2 group">
                Browse Full History <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}