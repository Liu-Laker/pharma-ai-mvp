import { useState } from 'react'
import {
  FileCheck, Tag, ArrowRight, Sparkles, Database,
  CheckCircle2, Clock, Shield, Smartphone, PenLine, ChevronDown, Loader2
} from 'lucide-react'
import { useToast } from '../components/ui/useToast'
import { visitSummaryData } from '../data/mockData'

export default function VisitSummary() {
  const { showSuccess, showInfo } = useToast()
  const data = visitSummaryData
  const [crmConfirmed, setCrmConfirmed] = useState(false)
  const [showMobile, setShowMobile] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleConfirmCrm = () => {
    if (crmConfirmed) return
    setSubmitting(true)
    showInfo('正在回填 CRM', '同步拜访数据至企业 CRM 系统...')
    setTimeout(() => {
      setSubmitting(false)
      setCrmConfirmed(true)
      showSuccess('回填成功', '拜访数据已同步至 CRM，可前往管理后台查看')
    }, 1200)
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileCheck className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">会后纪要与回填</h1>
        </div>
        <p className="text-sm text-gray-500">自动提取本次沟通结果，生成结构化纪要，并确认回填 CRM</p>
      </div>

      {/* Visit Info Bar */}
      <div className="card flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
            {data.doctorName[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{data.doctorName}</p>
            <p className="text-xs text-gray-500">{data.visitDate} {data.visitTime} · {data.duration}</p>
          </div>
        </div>
        <span className="tag-green text-sm">拜访完成</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Summary + Tags + Next Actions */}
        <div className="lg:col-span-1 space-y-4">
          {/* Visit Summary */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-gray-900">会后纪要</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>

          {/* Doctor Feedback Tags */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-gray-900">医生反馈标签</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1.5">关注点</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.feedbackTags.concern.map(t => (
                    <span key={t} className="tag-blue text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">意向</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.feedbackTags.intent.map(t => (
                    <span key={t} className="tag-green text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">风险</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.feedbackTags.risk.map(t => (
                    <span key={t} className="tag-red text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-gray-900">下一步动作</h2>
            </div>
            <div className="space-y-2.5">
              {data.nextActions.map((a, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{a.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                        a.priority === '高' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>{a.priority}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{a.suggestedTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: AI Extracted Results */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-900">AI 抽取结果</h2>
            </div>
            <div className="space-y-3">
              {data.aiExtracted.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-blue-600 font-medium">{item.field}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">依据：{item.basis}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-100/50 rounded-xl">
              <p className="text-xs text-blue-700 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                以上抽取结果已通过合规审核
              </p>
            </div>
          </div>

          {/* CRM Confirm & Fill */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">确认回填 CRM</h2>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">CRM 拜访状态</span>
                <span className="text-sm font-medium text-gray-900">{data.crmFields.visitStatus}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">下步行动</span>
                <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">{data.crmFields.nextAction}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">优先级</span>
                <span className={`text-sm font-medium ${data.crmFields.priority === '高' ? 'text-red-600' : 'text-gray-900'}`}>{data.crmFields.priority}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-1">备注</span>
                <p className="text-sm text-gray-900 leading-relaxed">{data.crmFields.remark}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleConfirmCrm}
                disabled={submitting || crmConfirmed}
                className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                  crmConfirmed
                    ? 'bg-emerald-100 text-emerald-700'
                    : submitting
                      ? 'bg-blue-400 text-white cursor-wait'
                      : 'btn-primary'
                }`}
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />正在回填...</>
                ) : crmConfirmed ? (
                  <><CheckCircle2 className="w-4 h-4" />已确认回填 CRM</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" />确认并回填 CRM</>
                )}
              </button>
              {!crmConfirmed && !submitting && (
                <button className="w-full btn-secondary flex items-center justify-center gap-2 text-sm">
                  <PenLine className="w-4 h-4" />
                  手动调整后回填
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Mobile Collaboration */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-gray-600" />
              <h2 className="text-sm font-bold text-gray-900">移动端协同</h2>
            </div>
            <p className="text-xs text-gray-500 mb-3">代表可通过手机端查看计划、阅读作战卡、开始记录、确认纪要</p>

            {/* Phone Mock */}
            <div
              onClick={() => setShowMobile(!showMobile)}
              className="bg-gray-900 rounded-2xl p-3 mx-auto max-w-[240px] cursor-pointer"
            >
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="bg-blue-600 px-3 py-2 text-white text-xs font-medium flex items-center justify-between">
                  <span>智能拜访副驾</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="p-2.5 space-y-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-[10px] text-blue-600 font-medium">下一位医生</p>
                    <p className="text-xs text-gray-900 font-bold">张伟 · 心内科</p>
                    <p className="text-[10px] text-gray-500">14:30 · 协和医院</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-[10px] text-gray-500">AI 建议</p>
                    <p className="text-[10px] text-gray-700">建议开场：上次真实世界数据已整理...</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="flex-1 bg-blue-600 text-white text-[10px] text-center py-1 rounded">开始拜访</span>
                    <span className="flex-1 bg-gray-200 text-gray-600 text-[10px] text-center py-1 rounded">查看作战卡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-sm font-bold text-gray-900 mb-3">本次拜访数据</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-lg font-bold text-blue-700">28</p>
                <p className="text-xs text-blue-600">分钟</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg text-center">
                <p className="text-lg font-bold text-emerald-700">6</p>
                <p className="text-xs text-emerald-600">条实时摘要</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg text-center">
                <p className="text-lg font-bold text-amber-700">3</p>
                <p className="text-xs text-amber-600">条建议</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-700">8</p>
                <p className="text-xs text-purple-600">条对话记录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
