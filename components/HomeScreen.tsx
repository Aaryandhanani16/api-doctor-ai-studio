import React from 'react';
import { Box, Play } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const HomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center space-y-8 animate-fade-in">
      <div className="bg-primary/10 p-6 rounded-full ring-8 ring-primary/5">
        <Box size={64} className="text-primary" />
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
          Effortless API Testing, Powered by AI
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Diagnose, document, and debug your APIs with intelligent insights and real-time performance metrics.
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center pl-4 pr-2 py-2">
        <span className="text-gray-400 dark:text-gray-500 mr-2 text-sm font-mono">https://api.example.com</span>
        <div className="flex-1"></div>
        <button 
          onClick={onStart}
          className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
        >
          <span>Start Testing</span>
        </button>
      </div>

      <div className="flex space-x-8 pt-8 opacity-60">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">FAST</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Analysis</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">SECURE</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Local Key</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">SMART</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">Gemini AI</div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;