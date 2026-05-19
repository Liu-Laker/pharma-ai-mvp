import { useState, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/ui/useToast'
import { VisitFlowContext, type VisitFlowState } from './visitFlowContextValue'

export function VisitFlowProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { showSuccess, showInfo } = useToast()
  const [state, setState] = useState<VisitFlowState>({
    currentVisitId: null,
    isRecording: false,
    visitStatus: 'idle',
  })

  const startVisit = useCallback((visitId: string) => {
    setState({ currentVisitId: visitId, isRecording: false, visitStatus: 'preparing' })
    showInfo('拜访准备中', '正在加载医生作战卡和AI建议...')
    setTimeout(() => {
      setState(prev => ({ ...prev, visitStatus: 'in-progress' }))
      navigate('/copilot')
      showSuccess('拜访已启动', '系统开始记录本次拜访')
    }, 800)
  }, [navigate, showInfo, showSuccess])

  const beginRecording = useCallback(() => {
    setState(prev => ({ ...prev, isRecording: true }))
    showSuccess('开始记录', '系统正在实时识别对话内容')
  }, [showSuccess])

  const endVisit = useCallback(() => {
    setState(prev => ({ ...prev, isRecording: false, visitStatus: 'summarizing' }))
    showInfo('拜访结束', '正在生成会后纪要...')
    setTimeout(() => {
      setState(prev => ({ ...prev, visitStatus: 'summarizing' }))
      navigate('/summary')
    }, 1200)
  }, [navigate, showInfo])

  const completeVisit = useCallback(() => {
    setState(prev => ({ ...prev, visitStatus: 'completed' }))
    showSuccess('CRM回填成功', '本次拜访记录已同步至CRM系统')
    setTimeout(() => {
      setState({ currentVisitId: null, isRecording: false, visitStatus: 'idle' })
      navigate('/')
    }, 1500)
  }, [navigate, showSuccess])

  const reset = useCallback(() => {
    setState({ currentVisitId: null, isRecording: false, visitStatus: 'idle' })
  }, [])

  return (
    <VisitFlowContext.Provider value={{ ...state, startVisit, beginRecording, endVisit, completeVisit, reset }}>
      {children}
    </VisitFlowContext.Provider>
  )
}
