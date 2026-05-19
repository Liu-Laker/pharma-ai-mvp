import { useContext } from 'react'
import { VisitFlowContext } from './visitFlowContextValue'

export function useVisitFlow() {
  const ctx = useContext(VisitFlowContext)
  if (!ctx) throw new Error('useVisitFlow must be used within VisitFlowProvider')
  return ctx
}
