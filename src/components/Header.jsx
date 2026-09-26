import React from 'react';
import { Bell, LogOut, CheckCircle2, RefreshCw, User as UserIcon } from 'lucide-react';

export function Header({ user, profile, syncing, onLogout }) {
  return (
    <header className="bg-slate-800 sticky top-0 z-10 shadow-sm border-b border-slate-700 h-16 flex items-center justify-between px-4 sm:px-8">
      {/* Mobile Title (hidden on desktop where Sidebar handles it) */}
      <div className="md:hidden flex items-center">
        <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          TrustScore AI
        </span>
      </div>

      <div className="hidden md:flex flex-1"></div>

      <div className="flex items-center space-x-4 ml-auto">
        {/* Sync Status Badge */}
        <div className="hidden sm:flex items-center text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
          {syncing ? (
            <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-cyan-500" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
          )}
          {syncing ? 'Syncing data...' : 'Auto-sync active'}
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-300 transition-colors rounded-full hover:bg-slate-800/50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-700">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-100">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-slate-800 shadow-sm ring-1 ring-emerald-200">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <button 
            onClick={onLogout}
            className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
