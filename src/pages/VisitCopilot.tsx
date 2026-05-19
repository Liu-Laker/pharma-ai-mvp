import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Radio, Mic, MicOff, Clock, AlertTriangle, Zap,
  Shield, Eye, ChevronRight, CheckCircle2, Sparkles,
  Square
} from 'lucide-react'
import { useToast } from '../components/ui/useToast'
import { copilotState } from '../data/mockData'

export default function VisitCopilot() {
  const navigate = useNavigate()
  const { showSuccess, showInfo, showWarning } = useToast()
  const [recording, setRecording] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [endingVisit, setEndingVisit] = useState(false)

  const state = copilotState

  const handleStartRecording = () => {
    setRecording(true)
    showSuccess('开始记录', '系统正在实时识别对话内容，会在关键时刻给出提示')
  }

  const handleEndVisit = () => {
    if (!recording) {
      showWarning('请先开始记录', '点击"开始拜访记录"后再结束拜访')
      return
    }
    setEndingVisit(true)
    showInfo('拜访结束', '正在分析会话内容，生成结构化纪要...')
    setTimeout(() => {
      setRecording(false)
      setEndingVisit(false)
      navigate('/summary')
    }, 1500)
  }

  return (
    <div className="space-y-4 md:space-y-5 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Radio className="w-5 h-5 text-blue-600" />
          <h1 className="text-display">拜访中副驾</h1>
        </div>
        <p className="text-caption">实时识别对话重点，在关键时刻给出一句最有用的提示</p>
      </div>

      {/* Session Status Bar */}
      <div className="card flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${recording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium text-gray-900">
              {recording ? '正在聆听' : endingVisit ? '正在分析...' : '暂停中'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {state.duration}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{state.currentStage}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-500">
            <span className="text-gray-400">当前识别重点：</span>
            <span className="text-gray-700 font-medium">{state.currentFocus}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!recording ? (
            <button
              onClick={handleStartRecording}
              disabled={endingVisit}
              className="btn-primary flex items-center gap-2 ripple"
            >
              <Mic className="w-4 h-4" />
              开始拜访记录
            </button>
          ) : (
            <>
              <button
                onClick={() => setRecording(false)}
                className="btn-secondary flex items-center gap-2"
              >
                <MicOff className="w-4 h-4" />
                暂停记录
              </button>
              <button
                onClick={handleEndVisit}
                disabled={endingVisit}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
              >
                <Square className="w-4 h-4" />
                {endingVisit ? '分析中...' : '结束拜访'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Left: Real-time Record */}
        <div className="lg:col-span-1 space-y-3 md:space-y-4">
          {/* Real-time Summary */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h2 className="text-title">实时摘要</h2>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {state.transcript.filter(t => t.summary).map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-gray-50 text-xs animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400">{t.time}</span>
                    <span className={`font-medium ${t.speaker === '医生' ? 'text-blue-600' : 'text-gray-700'}`}>
                      {t.speaker}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{t.summary}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              {showDetail ? '收起' : '查看'}详细记录流 <ChevronRight className={`w-3 h-3 transition-transform ${showDetail ? 'rotate-90' : ''}`} />
            </button>
            {showDetail && (
              <div className="mt-2 space-y-1 max-h-40 overflow-y-auto border-t border-gray-100 pt-2 animate-fade-in-up">
                {state.transcript.map((t, i) => (
                  <div key={i} className="text-xs text-gray-500 flex gap-2">
                    <span className="text-gray-400 shrink-0">{t.time}</span>
                    <span className={`shrink-0 ${t.speaker === '医生' ? 'text-blue-600' : 'text-gray-600'}`}>
                      {t.speaker}：
                    </span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session Navigation */}
          <div className="card">
            <h2 className="text-title mb-3">会话导航</h2>
            <div className="mb-3">
              <p className="text-label mb-1.5">未覆盖重点</p>
              <div className="space-y-1.5">
                {state.uncoveredPoints.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <p className="text-label mb-1.5">建议补充</p>
              <div className="space-y-1.5">
                {state.suggestedSupplements.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-blue-700">
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label text-red-500 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> 风险提醒
              </p>
              <div className="space-y-1.5">
                {state.riskAlerts.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-red-600">
                    <Shield className="w-3 h-3 shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Current Suggestion Main Card */}
        <div className="lg:col-span-1">
          <div className="card bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white sticky top-4 shadow-glow">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5" />
              <h2 className="text-lg font-bold">当前建议</h2>
              <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${
                state.currentSuggestion.priority === '高' ? 'bg-red-500' : 'bg-white/20'
              }`}>
                {state.currentSuggestion.priority}优先级
              </span>
            </div>
            <div className="bg-white/15 rounded-xl p-4 mb-4 backdrop-blur-sm">
              <p className="text-base md:text-lg font-medium leading-relaxed">
                {state.currentSuggestion.suggestion}
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm text-blue-100">
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{state.currentSuggestion.reason}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <Clock className="w-3.5 h-3.5" />
                基于 {state.duration} 会话内容生成
              </div>
            </div>
          </div>
        </div>

        {/* Right: Glass Preview */}
        <div className="lg:col-span-1 space-y-3 md:space-y-4">
          <div className="card bg-gray-900 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-bold">眼镜端提示预览</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">当前建议</p>
                <p className="text-sm font-medium">{state.glassPreview.suggestion}</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">当前重点</p>
                <p className="text-sm font-medium">{state.glassPreview.focus}</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <p className="text-xs text-red-300 mb-1">风险提醒</p>
                <p className="text-sm font-medium text-red-200">{state.glassPreview.risk}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">眼镜端只显示一句话，复杂信息保留在手机端</p>
          </div>

          {/* Stage Progress */}
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-3">会话阶段</h2>
            <div className="space-y-2">
              {['开场阶段', '需求确认', '重点讲解', '异议处理', '收尾'].map((stage, i) => {
                const isCurrent = stage === state.currentStage
                const isPast = ['开场阶段', '需求确认'].includes(stage) && !isCurrent
                return (
                  <div key={stage} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent ? 'bg-blue-600 text-white shadow-glow' :
                      isPast ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-sm ${isCurrent ? 'font-bold text-blue-700' : isPast ? 'text-gray-700' : 'text-gray-400'}`}>
                      {stage}
                    </span>
                    {isCurrent && <span className="ml-auto text-xs text-blue-600 font-medium">当前</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
