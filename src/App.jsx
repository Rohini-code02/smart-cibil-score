import React, { useState, useEffect } from 'react';
import { supabase, isMockSupabase } from './lib/supabase';
import { ShieldCheck } from 'lucide-react';

import { Sidebar, MobileNav } from './components/Navigation';
import { Header } from './components/Header';
import { DashboardScreen } from './screens/DashboardScreen';
import { ConnectorsScreen } from './screens/ConnectorsScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { OffersScreen } from './screens/OffersScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function AuthScreen({ onLogin }) {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGoogleLogin = async () => {
    if (isMockSupabase) {
      onLogin({ id: 'mock-user-123', email: 'user@example.com', user_metadata: { full_name: 'Demo User' } });
    } else {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) setErrorMsg(error.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (isMockSupabase) {
      setTimeout(() => {
        setLoading(false);
        if (authMode === 'login') {
          onLogin({ id: 'mock-user-123', email, user_metadata: { full_name: email.split('@')[0] } });
        } else {
          setSuccessMsg('Mock account created successfully! Signing in...');
          setTimeout(() => {
            onLogin({ id: `mock-user-${Date.now()}`, email, user_metadata: { full_name: email.split('@')[0] } });
          }, 1000);
        }
      }, 1000);
      return;
    }

    try {
      if (authMode === 'signup') {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user && data?.session === null) {
          setSuccessMsg('Check your email for the confirmation link!');
        } else {
          setSuccessMsg('Account created successfully!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-700 text-center">
        <div className="flex justify-center mb-4">
          <ShieldCheck className="w-16 h-16 text-cyan-500" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          TrustScore AI
        </h1>
        <p className="text-slate-400 mb-8">
          The alternative credit scoring platform that believes in your potential.
        </p>

        <div className="flex space-x-2 mb-6 bg-slate-800/50 p-1 rounded-xl">
          <button
            onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${authMode === 'login' ? 'bg-slate-800 shadow-sm text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${authMode === 'signup' ? 'bg-slate-800 shadow-sm text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-200 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-slate-500 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium shadow-sm transition-all ${loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}
          >
            {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center px-4 py-3 border border-slate-500 shadow-sm rounded-xl text-base font-medium text-slate-200 bg-slate-800 hover:bg-slate-800/50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
        
        {isMockSupabase && (
          <p className="mt-6 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
            Running in mock mode. Real authentication requires Supabase environment variables.
          </p>
        )}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  const [connectors, setConnectors] = useState({
    utilities: false,
    rent: false,
    upi: false,
  });
  const [connectorDetails, setConnectorDetails] = useState({});
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Load local documents
    const savedDocs = localStorage.getItem('trustscore_docs');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  useEffect(() => {
    // Check initial auth state
    if (!isMockSupabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    setLoading(true);
    if (isMockSupabase) {
      // Mock data load
      setTimeout(() => {
        const savedMockProfile = localStorage.getItem('mock_profile');
        if (savedMockProfile) {
          setProfile(JSON.parse(savedMockProfile));
        } else {
          setProfile({ 
            full_name: user.user_metadata?.full_name || 'Demo User', 
            trust_score: 500,
            profession: 'Freelancer / Independent',
            phone: ''
          });
        }
        setConnectors({ utilities: true, rent: false, upi: true });
        setLoading(false);
      }, 500);
      return;
    }

    try {
      // Fetch or create profile
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // User not found, create one
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id, 
            email: user.email, 
            full_name: user.user_metadata?.full_name,
            trust_score: 500
          }])
          .select()
          .single();
        profileData = newProfile;
      }
      
      setProfile(profileData);

      // Fetch credit data connectors state
      const { data: creditData } = await supabase
        .from('credit_data')
        .select('data_type, status')
        .eq('user_id', user.id);

      if (creditData) {
        const newConnectors = { utilities: false, rent: false, upi: false };
        const newDetails = {};
        creditData.forEach(item => {
          if (item.status === 'connected') {
            newConnectors[item.data_type] = true;
            newDetails[item.data_type] = {
              provider_name: item.provider_name,
              amount: item.amount,
              date: item.date
            };
          }
        });
        setConnectors(newConnectors);
        setConnectorDetails(newDetails);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isMockSupabase) {
      setUser(null);
      setProfile(null);
    } else {
      await supabase.auth.signOut();
    }
  };

  const baseScore = 500;
  const customBoost = Object.keys(connectors).filter(k => k.startsWith('custom_') && connectors[k]).length * 20;
  const score = baseScore 
    + (connectors.utilities ? 80 : 0) 
    + (connectors.rent ? 90 : 0) 
    + (connectors.upi ? 70 : 0)
    + customBoost;

  // Sync score when connectors change
  useEffect(() => {
    const updateScore = async () => {
      if (!isMockSupabase && user && profile && profile.trust_score !== score) {
        await supabase
          .from('profiles')
          .update({ trust_score: score })
          .eq('id', user.id);
        setProfile(prev => ({ ...prev, trust_score: score }));
      }
    };
    updateScore();
  }, [score, connectors, isMockSupabase, user, profile]);

  const toggleConnector = async (key, data = null) => {
    setSyncing(true);
    const isCurrentlyConnected = connectors[key];
    const newStatus = isCurrentlyConnected ? 'disconnected' : 'connected';

    if (isMockSupabase) {
      setTimeout(() => {
        setConnectors(prev => ({ ...prev, [key]: !isCurrentlyConnected }));
        setSyncing(false);
      }, 500);
      return;
    }

    try {
      if (!isCurrentlyConnected) {
        // Connect
        const { data: existing } = await supabase
          .from('credit_data')
          .select('id')
          .eq('user_id', user.id)
          .eq('data_type', key)
          .single();

        if (existing) {
          await supabase.from('credit_data').update({ 
            status: 'connected',
            provider_name: data?.details || 'Generic Provider',
            amount: parseFloat(data?.amount) || 0
          }).eq('id', existing.id);
        } else {
          await supabase.from('credit_data').insert([{
            user_id: user.id,
            data_type: key,
            provider_name: data?.details || 'Generic Provider',
            amount: parseFloat(data?.amount) || 0,
            status: 'connected',
            date: new Date().toISOString()
          }]);
        }
        // Handle simulated file upload locally
        if (data?.file) {
          const newDoc = {
            id: Date.now().toString(),
            name: data.file.name,
            size: (data.file.size / 1024 / 1024).toFixed(2) + ' MB',
            category: key === 'utilities' ? 'Utility' : key === 'rent' ? 'Rent' : key === 'upi' ? 'UPI' : 'Custom',
            date: new Date().toLocaleDateString(),
          };
          setDocuments(prev => {
            const updated = [newDoc, ...prev];
            localStorage.setItem('trustscore_docs', JSON.stringify(updated));
            return updated;
          });
        }
      } else {
        // Disconnect
        await supabase
          .from('credit_data')
          .update({ status: 'disconnected' })
          .eq('user_id', user.id)
          .eq('data_type', key);
        
        setConnectorDetails(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
      setConnectors(prev => ({ ...prev, [key]: !isCurrentlyConnected }));
    } catch (err) {
      console.error("Failed to toggle connector", err);
      throw err; // Re-throw to be caught in ConnectorsScreen
    } finally {
      setSyncing(false);
    }
  };

  const handleUpdateProfile = async (updates) => {
    if (isMockSupabase) {
      setProfile(prev => {
        const next = { ...prev, ...updates };
        localStorage.setItem('mock_profile', JSON.stringify(next));
        return next;
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...updates });
      
      if (error) throw error;
      setProfile(prev => ({ ...prev, ...updates }));
    } catch (err) {
      console.error("Failed to update profile", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={(u) => setUser(u)} />;
  }

  const renderScreen = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardScreen score={score} connectors={connectors} />;
      case 'connectors':
        return <ConnectorsScreen connectors={connectors} connectorDetails={connectorDetails} toggleConnector={toggleConnector} syncing={syncing} documents={documents} setDocuments={setDocuments} />;
      case 'insights':
        return <InsightsScreen connectors={connectors} score={score} />;
      case 'offers':
        return <OffersScreen score={score} />;
      case 'profile':
        return <ProfileScreen user={user} profile={profile} isMockSupabase={isMockSupabase} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <DashboardScreen score={score} connectors={connectors} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex text-slate-100">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-16 md:pb-0">
        <Header user={user} profile={profile} syncing={syncing} onLogout={handleLogout} />
        
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderScreen()}
          </div>
        </main>
      </div>

      <MobileNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default App;
