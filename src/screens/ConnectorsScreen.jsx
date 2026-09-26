import React, { useState } from 'react';
import { Zap, Home, TrendingUp, CheckCircle2, UploadCloud, X, AlertCircle, FileText, Plus } from 'lucide-react';

function ConnectorForm({ type, onSubmit, onCancel, loading }) {
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, details, file });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-slate-700 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            {type === 'utilities' ? 'Avg Monthly Bill (₹)' : type === 'rent' ? 'Monthly Rent (₹)' : 'Avg Monthly Inflow (₹)'}
          </label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="e.g. 1500"
          />
        </div>
        
        {type === 'rent' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Landlord UPI / Bank A/C
            </label>
            <input
              type="text"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="landlord@upi"
            />
          </div>
        )}

        {type === 'utilities' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Provider Name
            </label>
            <input
              type="text"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="e.g. BESCOM / Tata Power"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
          {type === 'utilities' ? 'Upload Recent Bill (PDF/Image)' : type === 'rent' ? 'Upload Rent Agreement' : 'Upload Bank Statement (PDF)'}
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-500 rounded-xl cursor-pointer bg-slate-800/50 hover:bg-slate-700 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-6 h-6 text-slate-500 mb-2" />
              <p className="text-sm text-slate-400 font-medium">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-cyan-600 text-white shadow-sm hover:bg-cyan-700 transition-colors disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Submit & Verify'}
        </button>
      </div>
    </form>
  );
}

function CustomCategoryForm({ onSubmit, onCancel, loading }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: `custom_${Date.now()}`,
      data: {
        details: `${name} (${frequency})`,
        amount,
        file
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add Custom Document</h3>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Category / Bill Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="e.g. School Fee, Wi-Fi" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Amount (₹)</label>
              <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="1500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
                <option>One-Time</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Upload Document (PDF/Image)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-500 rounded-xl cursor-pointer bg-slate-800/50 hover:bg-slate-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-6 h-6 text-slate-500 mb-2" />
                  <p className="text-sm text-slate-400 font-medium">{file ? file.name : 'Click to upload'}</p>
                </div>
                <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} required />
              </label>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full mt-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all disabled:opacity-60">
            {loading ? 'Processing...' : 'Upload & Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Connector({ id, icon: Icon, title, description, isConnected, onToggle, loading, activeForm, setActiveForm, details }) {
  const isFormActive = activeForm === id;

  const handleConnectClick = () => {
    if (isConnected) {
      onToggle(); // Disconnect immediately
    } else {
      setActiveForm(id); // Open form
    }
  };

  const handleFormSubmit = (data) => {
    onToggle(data); // Call toggle with data
  };

  return (
    <div className={`bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all ${
      isConnected ? 'border-emerald-200 shadow-emerald-100/50' : 'border-slate-700 hover:border-slate-600 hover:shadow-md'
    }`}>
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-5">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-2xl ${isConnected ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-800/50 text-slate-500'}`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {title}
              {isConnected && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified
                </span>
              )}
            </h3>
            {isConnected && details ? (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-slate-100">
                  {details.provider_name} <span className="text-slate-500 font-normal ml-1">({id === 'utilities' ? 'Avg Bill' : id === 'rent' ? 'Rent' : 'Inflow'}: ₹{details.amount})</span>
                </p>
                <p className="text-xs text-slate-400">Connected on {new Date(details.date).toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400 mt-1 max-w-lg leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        
        {!isFormActive && (
          <button
            onClick={handleConnectClick}
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto flex-shrink-0 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            } ${
              isConnected 
                ? 'bg-slate-800 border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200' 
                : 'bg-cyan-600 text-white shadow-md hover:bg-cyan-700 hover:shadow-lg'
            }`}
          >
            {loading && activeForm === id ? 'Verifying...' : isConnected ? 'Disconnect' : 'Link Account'}
          </button>
        )}
      </div>

      {isFormActive && !isConnected && (
        <ConnectorForm 
          type={id} 
          onSubmit={handleFormSubmit} 
          onCancel={() => setActiveForm(null)}
          loading={loading}
        />
      )}
    </div>
  );
}

export function ConnectorsScreen({ connectors, connectorDetails, toggleConnector, syncing, documents, setDocuments }) {
  const [activeForm, setActiveForm] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleToggle = async (id, data = null) => {
    try {
      await toggleConnector(id, data);
      setActiveForm(null);
      setIsCustomModalOpen(false);
      
      if (!connectors[id]) {
        setToast({ type: 'success', message: 'Data source verified and linked successfully! Your TrustScore has been updated.' });
      } else {
        setToast({ type: 'info', message: 'Data source disconnected.' });
      }
      setTimeout(() => setToast(null), 5000);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to process request.' });
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleAddCustom = async ({ id, data }) => {
    handleToggle(id, data);
  };

  const handleDeleteDoc = (id) => {
    setDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== id);
      localStorage.setItem('trustscore_docs', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 flex items-center p-4 rounded-xl shadow-lg border ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" /> : <AlertCircle className="w-5 h-5 mr-3" />}
          <p className="text-sm font-medium">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-4 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-3xl flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Alternative Data Connectors</h2>
          <p className="text-slate-400 mt-2">
            Securely link your everyday financial activities. We use read-only access to verify your payment history and instantly boost your TrustScore.
          </p>
        </div>
        <button 
          onClick={() => setIsCustomModalOpen(true)}
          className="hidden sm:flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Custom Bill
        </button>
      </div>
      
      <button 
        onClick={() => setIsCustomModalOpen(true)}
        className="sm:hidden w-full flex items-center justify-center px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200"
      >
        <Plus className="w-4 h-4 mr-1.5" /> Add Custom Category
      </button>

      <div className="space-y-4 mt-8">
        <Connector 
          id="utilities"
          icon={Zap}
          title="Electricity & Utility Bills"
          description="Upload your recent discom bill to verify your last 6 months of timely utility payments. Boosts score by up to 80 points."
          isConnected={connectors.utilities}
          details={connectorDetails?.utilities}
          onToggle={(data) => handleToggle('utilities', data)}
          loading={syncing && activeForm === 'utilities'}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
        <Connector 
          id="rent"
          icon={Home}
          title="Digital Rent Payments"
          description="Upload your rent agreement and verify regular UPI/NEFT transfers to your landlord to establish stability. Boosts score by up to 90 points."
          isConnected={connectors.rent}
          details={connectorDetails?.rent}
          onToggle={(data) => handleToggle('rent', data)}
          loading={syncing && activeForm === 'rent'}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
        <Connector 
          id="upi"
          icon={TrendingUp}
          title="Consistent UPI Inflows"
          description="Upload your bank statement to analyze incoming payments and estimate business or freelance income. Boosts score by up to 70 points."
          isConnected={connectors.upi}
          details={connectorDetails?.upi}
          onToggle={(data) => handleToggle('upi', data)}
          loading={syncing && activeForm === 'upi'}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />

        {Object.keys(connectors).filter(k => k.startsWith('custom_') && connectors[k]).map(key => (
          <Connector 
            key={key}
            id={key}
            icon={FileText}
            title={connectorDetails[key]?.provider_name || 'Custom Category'}
            description="Verified custom document to boost your score by 20 points."
            isConnected={true}
            details={connectorDetails[key]}
            onToggle={() => handleToggle(key)}
            loading={syncing && activeForm === key}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
        ))}
      </div>

      {isCustomModalOpen && (
        <CustomCategoryForm 
          onSubmit={handleAddCustom}
          onCancel={() => setIsCustomModalOpen(false)}
          loading={syncing}
        />
      )}

      {/* Uploaded Documents Viewer */}
      {documents && documents.length > 0 && (
        <div className="mt-12 bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            Your Uploaded Documents
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800/50 rounded-lg">
                <tr>
                  <th className="px-6 py-4 rounded-l-xl font-semibold">Document Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Size</th>
                  <th className="px-6 py-4 rounded-r-xl font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <span className="truncate max-w-[200px]">{doc.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{doc.date}</td>
                    <td className="px-6 py-4 text-slate-400">{doc.size}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-cyan-600 hover:text-cyan-800 font-medium mr-4 transition-colors">
                        Preview
                      </button>
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start space-x-3">
        <div className="mt-0.5 text-blue-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-blue-800">
          <strong>Privacy First:</strong> Your credentials and documents are never stored permanently. We use bank-grade encryption to securely extract read-only data for score calculation.
        </p>
      </div>
    </div>
  );
}
