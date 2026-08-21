'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  confirm: (title: string, message: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback for components outside provider — safe no-op
    return {
      addToast: (t: Omit<Toast, 'id'>) => { console.log('[Toast]', t.title); },
      confirm: async () => true,
    };
  }
  return ctx;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />,
};

const bgMap: Record<ToastType, string> = {
  success: 'border-emerald-500/40 bg-[#0D3B2E]/90',
  error: 'border-red-500/40 bg-[#4A0512]/90',
  warning: 'border-amber-500/40 bg-[#4A3000]/90',
  info: 'border-sky-500/40 bg-[#0A2540]/90',
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-xl max-w-sm w-full ${bgMap[toast.type]}`}
    >
      {iconMap[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-serif font-bold text-[#FFFDF8] tracking-wide">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs font-sans text-[#EBE2D0] mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-0.5 text-[#EBE2D0]/60 hover:text-[#FFFDF8] transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-[#241416]/60 backdrop-blur-sm z-[200]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-full max-w-sm p-6 rounded-lg bg-[#FFFDF8] border-2 border-[#C59B27] shadow-2xl"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#6A091A] border border-[#C59B27] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#E8C86B]" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#6A091A] uppercase tracking-wider">
              {title}
            </h3>
            <p className="text-xs font-sans text-[#7C6354] mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full bg-[#FAF6EE] text-[#6A091A] border border-[#C59B27] font-serif font-bold text-xs tracking-wider uppercase hover:bg-[#F3EDE0] transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-full bg-[#6A091A] text-[#E8C86B] border border-[#C59B27] font-serif font-bold text-xs tracking-wider uppercase hover:bg-[#4A0512] transition-colors"
          >
            CONFIRM
          </button>
        </div>
      </motion.div>
    </>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<{
    title: string;
    message: string;
    resolve: (value: boolean) => void;
  } | null>(null);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setToasts((prev) => [...prev.slice(-4), { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const confirm = useCallback((title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({ title, message, resolve });
    });
  }, []);

  const handleConfirm = () => {
    confirmState?.resolve(true);
    setConfirmState(null);
  };

  const handleCancel = () => {
    confirmState?.resolve(false);
    setConfirmState(null);
  };

  return (
    <ToastContext.Provider value={{ addToast, confirm }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[300] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onDismiss={dismissToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
      {/* Confirm Dialog */}
      <AnimatePresence>
        {confirmState && (
          <ConfirmDialog
            title={confirmState.title}
            message={confirmState.message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
