import React, { useState } from 'react';
import { CreditCard, Wallet, ChevronRight, Lock, Calculator } from 'lucide-react';

export function OffersScreen({ score }) {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [tenure, setTenure] = useState(6); // months
  
  const interestRate = score >= 700 ? 1.2 : 1.8; // Monthly %
  const emi = Math.round((loanAmount * (1 + (interestRate / 100) * tenure)) / tenure);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Pre-Approved Financial Offers</h2>
        <p className="text-slate-400 mt-2">Tailored loans and credit cards based on your TrustScore alternative data profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Card Offer */}
          <div className={`bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-700 transition-all relative overflow-hidden group ${score >= 600 ? 'hover:shadow-md cursor-pointer border-emerald-100' : 'opacity-70 cursor-not-allowed'}`}>
            {score >= 600 && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                Top Pick
              </div>
            )}
            {!score >= 600 && (
              <div className="absolute inset-0 bg-slate-800/50/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
                <div className="bg-slate-800 px-4 py-2 rounded-full shadow-sm text-sm font-bold text-slate-400 flex items-center">
                  <Lock className="w-4 h-4 mr-2" /> Requires 600 Score
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-5">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl">
                <CreditCard className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Trust Card Starter</h3>
                <p className="text-sm text-slate-400 mt-1">₹50,000 Limit • No Annual Fee</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Powered by Partner Bank</span>
                  {score >= 600 && (
                    <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center bg-cyan-50 px-4 py-2 rounded-xl transition-colors">
                      Claim Offer <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Offer */}
          <div className={`bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-700 transition-all relative overflow-hidden group ${score >= 700 ? 'hover:shadow-md cursor-pointer border-cyan-100' : 'opacity-70 cursor-not-allowed'}`}>
             {!score >= 700 && (
              <div className="absolute inset-0 bg-slate-800/50/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
                <div className="bg-slate-800 px-4 py-2 rounded-full shadow-sm text-sm font-bold text-slate-400 flex items-center">
                  <Lock className="w-4 h-4 mr-2" /> Requires 700 Score
                </div>
              </div>
            )}
            <div className="flex items-start space-x-5">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded-2xl">
                <Wallet className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Micro-Business Loan</h3>
                <p className="text-sm text-slate-400 mt-1">Up to ₹1,00,000 @ {interestRate}% p.m.</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instant Disbursal</span>
                  {score >= 700 && (
                    <button className="text-sm font-bold text-cyan-600 hover:text-cyan-700 flex items-center bg-cyan-50 px-4 py-2 rounded-xl transition-colors">
                      Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EMI Calculator */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 border border-slate-600 shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <Calculator className="w-5 h-5 text-slate-400 mr-2" />
            EMI Simulator
          </h3>
          
          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-200">Loan Amount</label>
                <span className="font-bold text-emerald-600">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="100000" 
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-200">Tenure</label>
                <span className="font-bold text-emerald-600">{tenure} Months</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="12" 
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 mt-auto">
              <p className="text-sm text-emerald-700 font-medium">Estimated EMI</p>
              <div className="flex items-end mt-1">
                <span className="text-3xl font-black text-emerald-600">₹{emi.toLocaleString()}</span>
                <span className="text-sm text-emerald-500 ml-1 mb-1">/mo</span>
              </div>
              <p className="text-xs text-emerald-500 mt-2">At {interestRate}% monthly interest rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
