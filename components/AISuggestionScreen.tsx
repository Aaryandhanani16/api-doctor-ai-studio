import React from 'react';
import { AISuggestion } from '../types';
import { BookOpen, Shield, Code, Lightbulb, Copy, Loader2, Key } from 'lucide-react';

interface Props {
  suggestion: AISuggestion | null;
  isLoading: boolean;
  hasKey: boolean;
}

const AISuggestionScreen: React.FC<Props> = ({ suggestion, isLoading, hasKey }) => {
  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="p-6 bg-red-100 dark:bg-red-900/20 rounded-full text-red-500">
           <Key size={48} />
        </div>
        <h2 className="text-2xl font-bold">API Key Missing</h2>
        <p className="text-gray-500 max-w-md">To use the AI features of API Doctor, you need to configure your Gemini API Key in the settings.</p>
      </div>
    );
  }

  if (isLoading || !suggestion) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <Loader2 className="animate-spin text-primary" size={64} />
        <h2 className="text-2xl font-bold">Analyzing API Data...</h2>
        <p className="text-gray-500">Gemini is generating documentation and looking for optimizations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold">AI Suggestions</h2>
         <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider">Gemini 2.5 Flash</span>
      </div>

      {/* Documentation Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-4">
           <div className="flex items-center space-x-2">
             <BookOpen size={24} />
             <h3 className="font-bold text-lg">AI-Generated Documentation</h3>
           </div>
           <div className="bg-white/20 p-2 rounded-lg cursor-pointer hover:bg-white/30 transition">
             <Copy size={16} />
           </div>
        </div>
        <p className="text-blue-50 leading-relaxed">
          {suggestion.documentation}
        </p>
      </div>

      {/* Accordions / Cards */}
      <div className="space-y-4">
        
        {/* Improvements */}
        <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
             <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
               <Lightbulb size={20} />
             </div>
             <h3 className="font-semibold text-lg">Suggested Improvements</h3>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-800/50">
             <ul className="space-y-2">
               {suggestion.improvements.map((item, idx) => (
                 <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                   <span className="mr-2 text-green-500">•</span>
                   {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Security */}
        {suggestion.security.length > 0 && (
          <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                <Shield size={20} />
              </div>
              <h3 className="font-semibold text-lg">Security Analysis</h3>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50">
              <ul className="space-y-2">
                {suggestion.security.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 text-red-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Code Sample */}
        <div className="bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                 <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-600 dark:text-gray-300">
                   <Code size={20} />
                 </div>
                 <h3 className="font-semibold text-lg">Reproduction Code</h3>
              </div>
              <button 
                 onClick={() => navigator.clipboard.writeText(suggestion.codeSnippet)}
                 className="text-xs flex items-center bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
              >
                <Copy size={12} className="mr-1"/> Copy
              </button>
            </div>
            <div className="p-0 overflow-x-auto bg-[#0d1117]">
               <pre className="p-4 text-sm font-mono text-gray-300">
                 {suggestion.codeSnippet}
               </pre>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AISuggestionScreen;