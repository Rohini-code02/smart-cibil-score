import React from 'react';
import { Lightbulb, Target, AlertCircle } from 'lucide-react';

export function InsightsScreen({ connectors, score }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Score Insights & Tips</h2>
        <p className="text-slate-400 mt-1">Understand what makes up your score and how to improve it.</p>
      </div>

      <div className="bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-700">
        <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center">
          <Target className="w-6 h-6 text-cyan-500 mr-2" />
          Score Breakdown
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-200">Base Score</span>
              <span className="font-bold text-white">500 / 500</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-gray-400 h-3 rounded-full w-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-200">Utility Payments</span>
              <span className="font-bold text-white">{connectors.utilities ? '80' : '0'} / 80</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all duration-1000 ${connectors.utilities ? 'bg-emerald-500 w-full' : 'w-0'}`}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-200">Rent Consistency</span>
              <span className="font-bold text-white">{connectors.rent ? '90' : '0'} / 90</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all duration-1000 ${connectors.rent ? 'bg-cyan-500 w-full' : 'w-0'}`}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-200">UPI Inflows</span>
              <span className="font-bold text-white">{connectors.upi ? '70' : '0'} / 70</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className={`h-3 rounded-full transition-all duration-1000 ${connectors.upi ? 'bg-blue-500 w-full' : 'w-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl p-8 border border-emerald-100">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
          AI Recommendations
        </h3>
        
        <div className="space-y-4">
          {connectors.utilities ? (
             <div className="flex items-start space-x-4 bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-700">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
              <div>
                <h4 className="font-bold text-slate-100">Excellent Utility Record</h4>
                <p className="text-sm text-slate-400 mt-1">Keep auto-pay enabled to ensure you never miss a payment and maintain your +80 point boost.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-4 bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-700">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-full mt-0.5"><AlertCircle className="w-4 h-4" /></div>
              <div>
                <h4 className="font-bold text-slate-100">Action Needed: Link Utilities</h4>
                <p className="text-sm text-slate-400 mt-1">You are missing out on 80 points. Connecting your electricity bill is the fastest way to boost your score today.</p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-4 bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-700">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full mt-0.5"><Lightbulb className="w-4 h-4" /></div>
            <div>
              <h4 className="font-bold text-slate-100">Maintain Minimum Balance</h4>
              <p className="text-sm text-slate-400 mt-1">To unlock premium loan offers (Tier 2), try maintaining an average daily balance above ₹5,000 for the next 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary import for the check icon in this file
import { CheckCircle2 } from 'lucide-react';
