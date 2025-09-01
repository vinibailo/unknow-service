"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "error";
}

const ToastContext = createContext<(msg: string, type?: "success" | "error") => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type?: "success" | "error") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded px-4 py-2 text-white ${
              t.type === "error" ? "bg-red-500" : "bg-gray-800"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
