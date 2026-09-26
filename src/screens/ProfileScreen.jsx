import React, { useState, useEffect } from 'react';
import { User as UserIcon, Shield, Database, Lock, Edit2, CheckCircle2, X } from 'lucide-react';

export function ProfileScreen({ user, profile, isMockSupabase, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    profession: 'Freelancer / Independent',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        profession: profile.profession || 'Freelancer / Independent',
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdateProfile(formData);
      setToast({ type: 'success', message: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => setToast(null), 5000);
    } catch (error) {
      console.error(error);
      setToast({ type: 'error', message: error.message || error.error_description || 'Failed to update profile in database.' });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 flex items-center p-4 rounded-xl shadow-lg border ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" /> : <Shield className="w-5 h-5 mr-3" />}
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-4 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Profile & Settings</h2>
          <p className="text-slate-400 mt-1">Manage your account and data privacy controls.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            <Edit2 className="w-4 h-4 mr-1.5" /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-700">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl font-bold border-4 border-slate-800 shadow-md">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{profile?.full_name || 'Anonymous User'}</h3>
            <p className="text-slate-400">{user?.email}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
              {profile?.profession || 'Freelancer / Independent'}
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-slate-700 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="+91"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Profession</label>
                <select
                  value={formData.profession}
                  onChange={e => setFormData({...formData, profession: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option>Student</option>
                  <option>Freelancer / Independent</option>
                  <option>Small Shop Owner</option>
                  <option>Salaried Professional</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Email (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-xl text-slate-400 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    full_name: profile?.full_name || '',
                    phone: profile?.phone || '',
                    profession: profile?.profession || 'Freelancer / Independent',
                  });
                }}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-60 flex items-center"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-10 pt-8 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center">
                <Database className="w-4 h-4 mr-2 text-slate-500" />
                Database Status
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Provider</span>
                  <span className="font-medium text-white">Supabase</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Connection</span>
                  {isMockSupabase ? (
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Mock Mode</span>
                  ) : (
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Live / Connected</span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Data Sync</span>
                  <span className="font-medium text-white">Real-time active</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-slate-500" />
                Privacy & Security
              </h4>
              <div className="space-y-3 text-sm">
                 <div className="flex items-center justify-between">
                  <span className="text-slate-400">Read-Only Mode</span>
                  <Lock className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  Your financial data is never stored locally. TrustScore AI uses read-only tokens to calculate your score on the fly. You can revoke access at any time from the Connectors tab.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
