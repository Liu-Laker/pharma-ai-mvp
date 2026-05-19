import { createContext } from 'react'
import type { ToastType } from './Toast'

export interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)
