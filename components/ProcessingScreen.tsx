import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

const ProcessingScreen: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const StepItem = ({ status, label }: { status: 'pending' | 'active' | 'done', label: string }) => (
    <div className="flex items-center space-x-4">
      {status === 'done' ? (
        <CheckCircle2 className="text-green-500" size={24} />
      ) : status === 'active' ? (
        <Loader2 className="text-primary animate-spin" size={24} />
      ) : (
        <Circle className="text-gray-300 dark:text-gray-700" size={24} />
      )}
      <span className={`text-lg font-medium ${status === 'pending' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-12">
      <div className="relative">
        <div className="w-48 h-48 rounded-full border-4 border-gray-200 dark:border-slate-800 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-32 h-32 rounded-full border-t-4 border-primary animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-primary rounded-lg rotate-45 animate-ping opacity-20"></div>
        </div>
      </div>

      <div className="space-y-6 w-full max-w-sm">
        <StepItem status={step > 0 ? 'done' : step === 0 ? 'active' : 'pending'} label="Initializing test environment..." />
        <StepItem status={step > 1 ? 'done' : step === 1 ? 'active' : 'pending'} label="Executing Request..." />
        <StepItem status={step > 2 ? 'done' : step === 2 ? 'active' : 'pending'} label="Validating response..." />
      </div>
    </div>
  );
};

export default ProcessingScreen;