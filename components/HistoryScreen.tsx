import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Search, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: () => void;
}

const HistoryScreen: React.FC<Props> = ({ history, onSelect, onDelete }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredHistory = history.filter(item => 
    item.request.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.request.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
       <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Request History</h2>
        {history.length > 0 && (
          <button onClick={onDelete} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors flex items-center text-sm font-medium">
            <Trash2 size={16} className="mr-2" />
            Clear All
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by URL or status..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
         {filteredHistory.length === 0 ? (
           <div className="text-center py-20 text-gray-400">
             No history found. Run some tests!
           </div>
         ) : (
           filteredHistory.map((item, index) => {
             const isSuccess = item.response && item.response.statusCode >= 200 && item.response.statusCode < 300;
             return (
               <div 
                 key={index} 
                 onClick={() => onSelect(item)}
                 className="bg-white dark:bg-[#1f2937] p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary cursor-pointer transition-all group shadow-sm"
               >
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                       {isSuccess ? 
                         <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full"><CheckCircle2 size={16} className="text-green-600 dark:text-green-400" /></div> : 
                         <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full"><XCircle size={16} className="text-red-600 dark:text-red-400" /></div>
                       }
                       <span className={`font-bold ${
                         item.request.method === 'GET' ? 'text-blue-500' : 
                         item.request.method === 'POST' ? 'text-green-500' : 
                         item.request.method === 'DELETE' ? 'text-red-500' : 'text-orange-500'
                       }`}>{item.request.method}</span>
                       <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px] md:max-w-md">
                         {new URL(item.request.url).pathname}
                       </span>
                    </div>
                    <span className="text-xs text-gray-400">
                       {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                 </div>
                 <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pl-10">
                    <div className="flex space-x-4">
                       {item.response && (
                         <>
                           <span>{item.response.statusCode} {item.response.statusText}</span>
                           <span>•</span>
                           <span>{item.response.time}ms</span>
                         </>
                       )}
                    </div>
                 </div>
               </div>
             );
           })
         )}
      </div>
    </div>
  );
};

export default HistoryScreen;