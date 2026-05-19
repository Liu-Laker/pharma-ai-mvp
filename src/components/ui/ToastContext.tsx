import { useState, useCallback, type ReactNode } from 'react'
import { ToastContainer, type ToastItem, type ToastType } from './Toast'
import { ToastContext } from './toastContextValue'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 7)
    setToasts(prev => [...prev, { id, type, title, message }])
  }, [])

  const showSuccess = useCallback((title: string, message?: string) => showToast('success', title, message), [showToast])
  const showError = useCallback((title: string, message?: string) => showToast('error', title, message), [showToast])
  const showWarning = useCallback((title: string, message?: string) => showToast('warning', title, message), [showToast])
  const showInfo = useCallback((title: string, message?: string) => showToast('info', title, message), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
