import { createContext } from 'react'

export interface VisitFlowState {
  currentVisitId: string | null
  isRecording: boolean
  visitStatus: 'idle' | 'preparing' | 'in-progress' | 'summarizing' | 'completed'
}

export interface VisitFlowContextType extends VisitFlowState {
  startVisit: (visitId: string) => void
  beginRecording: () => void
  endVisit: () => void
  completeVisit: () => void
  reset: () => void
}

export const VisitFlowContext = createContext<VisitFlowContextType | null>(null)
