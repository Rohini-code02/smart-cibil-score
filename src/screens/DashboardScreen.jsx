import React from 'react';
import { Wallet, Zap, TrendingUp, Info } from 'lucide-react';

function CircularProgress({ score, max = 900 }) {
  const percentage = (score / max) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          className="text-emerald-50"
          strokeWidth="14"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
        <circle
          className="text-emerald-500 drop-shadow-sm transition-all duration-1000 ease-out"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-black text-slate-100 tracking-tight">{score}</span>
        <span className="text-sm font-medium text-slate-500 mt-1">out of {max}</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, trendClass = "text-green-600" }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-700 flex items-center space-x-4 hover:shadow-md transition-shadow">
      <div className="p-3.5 bg-cyan-50 text-cyan-600 rounded-xl">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
        {subtitle && <p className={`text-xs font-semibold mt-1 ${trendClass}`}>{subtitle}</p>}
      </div>
    </div>
  );
}

export function DashboardScreen({ score, connectors }) {
  const activeConnectorsCount = Object.values(connectors).filter(Boolean).length;
  const status = score >= 700 ? 'Good Standing' : score >= 600 ? 'Building' : 'Needs Attention';
  const statusColor = score >= 700 ? 'bg-emerald-100 text-emerald-700' : score >= 600 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-slate-400 mt-1">Here is a snapshot of your alternative credit health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-1 bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-700 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between items-center mb-2">
            <h3 className="font-semibold text-slate-200">TrustScore</h3>
            <Info className="w-5 h-5 text-gray-300 hover:text-slate-400 cursor-pointer transition-colors" />
          </div>
          
          <CircularProgress score={score} />
          
          <div className={`mt-2 px-4 py-1.5 rounded-full text-sm font-bold ${statusColor}`}>
            {status}
          </div>
          <p className="text-xs text-slate-500 mt-4">Last calculated just now</p>
        </div>

        {/* Quick Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard 
            icon={Wallet} 
            title="Verified Monthly Inflow" 
            value={activeConnectorsCount > 0 ? "₹45,200" : "₹0"} 
            subtitle={activeConnectorsCount > 0 ? "↑ 12% vs last month" : "Connect data to see"}
          />
          <StatCard 
            icon={Zap} 
            title="Active Data Sources" 
            value={`${activeConnectorsCount} Connected`} 
            subtitle={activeConnectorsCount === 3 ? "Maximum data linked" : "More sources available"}
            trendClass={activeConnectorsCount === 3 ? "text-emerald-600" : "text-blue-500"}
          />
          <StatCard 
            icon={TrendingUp} 
            title="Payment Streak" 
            value={connectors.utilities || connectors.rent ? "6 Months" : "0 Months"} 
            subtitle={connectors.utilities ? "Perfect record" : "Start building history"}
          />
          
          <div className="bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-700 flex flex-col">
            <h4 className="text-sm font-medium text-slate-400 mb-4">Recent Activity</h4>
            {activeConnectorsCount > 0 ? (
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-slate-200">Electricity Bill Paid</span>
                  </div>
                  <span className="text-xs text-slate-500">2d ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-sm font-medium text-slate-200">UPI Inflow (₹5,000)</span>
                  </div>
                  <span className="text-xs text-slate-500">4d ago</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-sm text-slate-500 italic">
                No recent activity. Connect sources above.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
