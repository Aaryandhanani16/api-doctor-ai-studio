import React, { useState } from 'react';
import { ApiRequest } from '../types';
import { Play, Plus, Trash2 } from 'lucide-react';

interface Props {
  initialRequest: ApiRequest;
  onSubmit: (req: ApiRequest) => void;
  defaultMethod: string;
}

const RequestScreen: React.FC<Props> = ({ initialRequest, onSubmit, defaultMethod }) => {
  const [method, setMethod] = useState(initialRequest.method || defaultMethod);
  const [url, setUrl] = useState(initialRequest.url);
  const [activeTab, setActiveTab] = useState<'headers' | 'body' | 'params'>('headers');
  const [headers, setHeaders] = useState(initialRequest.headers.length ? initialRequest.headers : [{ key: 'Content-Type', value: 'application/json' }]);
  const [params, setParams] = useState(initialRequest.params.length ? initialRequest.params : [{ key: '', value: '' }]);
  const [body, setBody] = useState(initialRequest.body || '{\n  \n}');

  const handleKVChange = (
    setter: React.Dispatch<React.SetStateAction<{key: string, value: string}[]>>,
    list: {key: string, value: string}[],
    index: number,
    field: 'key' | 'value',
    newValue: string
  ) => {
    const newList = [...list];
    newList[index][field] = newValue;
    setter(newList);
  };

  const addKV = (setter: React.Dispatch<React.SetStateAction<{key: string, value: string}[]>>) => {
    setter(prev => [...prev, { key: '', value: '' }]);
  };

  const removeKV = (
    setter: React.Dispatch<React.SetStateAction<{key: string, value: string}[]>>,
    index: number
  ) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      url,
      method,
      headers: headers.filter(h => h.key),
      params: params.filter(p => p.key),
      body,
      timestamp: Date.now()
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">New API Request</h2>
      </div>

      <div className="bg-white dark:bg-[#1f2937] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative min-w-[120px]">
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block pl-1">Method</label>
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 font-semibold text-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
              >
                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block pl-1">Endpoint URL</label>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/v1/resource"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              {['headers', 'body', 'params'].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab 
                      ? 'text-primary' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeTab === 'headers' && (
                <div className="space-y-3">
                  {headers.map((h, i) => (
                    <div key={i} className="flex space-x-3">
                      <input 
                        placeholder="Key" 
                        value={h.key}
                        onChange={(e) => handleKVChange(setHeaders, headers, i, 'key', e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <input 
                        placeholder="Value" 
                        value={h.value}
                        onChange={(e) => handleKVChange(setHeaders, headers, i, 'value', e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <button type="button" onClick={() => removeKV(setHeaders, i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addKV(setHeaders)} className="flex items-center text-primary text-sm font-medium mt-2 hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
                    <Plus size={16} className="mr-1" /> Add Header
                  </button>
                </div>
              )}

              {activeTab === 'params' && (
                <div className="space-y-3">
                  {params.map((p, i) => (
                    <div key={i} className="flex space-x-3">
                      <input 
                        placeholder="Param Key" 
                        value={p.key}
                        onChange={(e) => handleKVChange(setParams, params, i, 'key', e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <input 
                        placeholder="Value" 
                        value={p.value}
                        onChange={(e) => handleKVChange(setParams, params, i, 'value', e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <button type="button" onClick={() => removeKV(setParams, i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                   <button type="button" onClick={() => addKV(setParams)} className="flex items-center text-primary text-sm font-medium mt-2 hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
                    <Plus size={16} className="mr-1" /> Add Param
                  </button>
                </div>
              )}

              {activeTab === 'body' && (
                <div className="relative">
                   <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full h-64 font-mono text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 outline-none focus:border-primary resize-none"
                    spellCheck={false}
                   />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 text-lg"
          >
            <Play size={20} fill="currentColor" />
            <span>Run Test</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestScreen;