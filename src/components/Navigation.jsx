import React from 'react';
import { 
  LayoutDashboard, 
  Link2, 
  TrendingUp, 
  CreditCard, 
  UserCircle 
} from 'lucide-react';

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'connectors', label: 'Data Connectors', icon: Link2 },
  { id: 'insights', label: 'Score Insights', icon: TrendingUp },
  { id: 'offers', label: 'Loan Offers', icon: CreditCard },
  { id: 'profile', label: 'Profile Settings', icon: UserCircle },
];

export function Sidebar({ currentTab, setCurrentTab }) {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-slate-800 border-r border-slate-700 shadow-sm z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
          <span className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mr-2 text-xl shadow-sm border border-cyan-100">
            T
          </span>
          TrustScore AI
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl p-4 text-white shadow-md">
          <p className="text-xs font-medium opacity-90">Need higher limits?</p>
          <p className="text-sm font-bold mt-1">Connect more data points</p>
          <button 
            onClick={() => setCurrentTab('connectors')}
            className="mt-3 w-full bg-slate-800/20 hover:bg-slate-800/30 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Go to Connectors
          </button>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav({ currentTab, setCurrentTab }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-2 py-2 flex justify-between items-center pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center justify-center w-full py-2 space-y-1 transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className={`p-1.5 rounded-full ${isActive ? 'bg-emerald-50' : 'bg-transparent'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}
