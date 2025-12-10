import React from 'react';
import { ApiResponse, ApiRequest } from '../types';
import { Clock, Database, CheckCircle2, AlertOctagon, Copy, Zap, RotateCcw, Activity } from 'lucide-react';

interface Props {
  response: ApiResponse | null;
  request: ApiRequest;
  onAnalyze: () => void;
  onRetry: () => void;
}

const ResultScreen: React.FC<Props> = ({ response, request, onAnalyze, onRetry }) => {
  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in">
        <div className="p-6 bg-gray-100 dark:bg-slate-800 rounded-full">
          <Activity size={48} className="text-gray-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">No Results Yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Run a test request from the Home or New Request screen to see detailed analysis here.
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = response.statusCode >= 200 && response.statusCode < 300;
  
  return (
    <div className="space-y-6 animate-fade-in pb-10">
       <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold flex items-center space-x-2">
            <span>{request.method} {new URL(request.url).pathname}</span>
           </h2>
           <p className={`text-sm font-medium mt-1 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
             Status: {response.statusCode} {response.statusText} - {isSuccess ? 'Success' : 'Failed'}
           </p>
        </div>
        <div className="flex space-x-2">
             <button onClick={onRetry} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
               <RotateCcw size={20} />
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1f2937] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <CheckCircle2 size={64} className={isSuccess ? 'text-green-500' : 'text-red-500'} />
           </div>
           <span className="text-gray-500 text-sm font-medium">Status Code</span>
           <span className={`text-4xl font-bold mt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{response.statusCode}</span>
        </div>
        <div className="bg-white dark:bg-[#1f2937] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Clock size={64} className="text-blue-500" />
           </div>
           <span className="text-gray-500 text-sm font-medium">Response Time</span>
           <span className="text-4xl font-bold mt-2 text-white dark:text-white">{response.time}<span className="text-lg text-gray-500 ml-1">ms</span></span>
        </div>
        <div className="bg-white dark:bg-[#1f2937] p-5 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Database size={64} className="text-purple-500" />
           </div>
           <span className="text-gray-500 text-sm font-medium">Response Size</span>
           <span className="text-4xl font-bold mt-2 text-white dark:text-white">{(response.size / 1024).toFixed(2)}<span className="text-lg text-gray-500 ml-1">KB</span></span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Response Body</h3>
          <button 
             onClick={() => navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))}
             className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>
        </div>
        <div className="p-0 overflow-x-auto">
          <pre className="text-sm font-mono p-6 text-gray-800 dark:text-gray-300">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      </div>
      
       {/* Performance Breakdown Visualization */}
      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
         <h3 className="font-semibold text-lg mb-6">Performance Breakdown</h3>
         <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Processing</span>
                <span className="font-mono">{Math.round(response.time * 0.1)}ms</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[10%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Transfer</span>
                <span className="font-mono">{Math.round(response.time * 0.8)}ms</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[80%] rounded-full"></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Client Parse</span>
                <span className="font-mono">{Math.round(response.time * 0.1)}ms</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[10%] rounded-full"></div>
              </div>
            </div>
         </div>
      </div>

      <button 
        onClick={onAnalyze}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
      >
        <Zap size={20} fill="currentColor" />
        <span>Get AI Fix Suggestions</span>
      </button>
    </div>
  );
};

export default ResultScreen;