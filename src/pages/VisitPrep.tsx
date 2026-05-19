import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardList, MapPin, Clock, AlertTriangle, Sparkles,
  Target, Shield, MessageSquare, Zap, CalendarDays, TrendingUp,
  Database
} from 'lucide-react'
import { useToast } from '../components/ui/useToast'
import { visitRecords, battleCards, type DataSource } from '../data/mockData'

function DataSourceBadge({ source }: { source: DataSource }) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100/50">
      <Database className="w-3 h-3" />
      <span>{source.icon} {source.platform}</span>
      <span>· 更新 {source.updateAt}</span>
    </div>
  )
}

export default function VisitPrep() {
  const navigate = useNavigate()
  const { showInfo } = useToast()
  const todayRecords = visitRecords.filter(v => v.visitDate === '2025-05-18')
  const [selectedRecordId, setSelectedRecordId] = useState(todayRecords[0]?.id || '')

  const selectedRecord = todayRecords.find(v => v.id === selectedRecordId)
  const selectedBattleCard = battleCards.find(b => b.doctorId === selectedRecord?.doctorId)

  const handleStartVisit = () => {
    showInfo('拜访准备就绪', `已进入拜访模式：${selectedRecord?.doctorName || '医生'}`)
    navigate('/copilot')
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">今日拜访助手</h1>
        </div>
        <p className="text-xs md:text-sm text-gray-500">帮助代表在拜访前快速掌握医生背景、本次目标与推荐切入点</p>
      </div>

      {/* Next Doctor Main Card */}
      {selectedRecord && (
        <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-base md:text-lg font-bold shrink-0">
                  {selectedRecord.doctorName[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg md:text-xl font-bold">{selectedRecord.doctorName}</span>
                    <span className="text-xs md:text-sm text-blue-100">{selectedRecord.department}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-blue-100 mt-0.5 flex-wrap">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" /> {selectedRecord.hospital}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-3.5 md:h-3.5" /> {selectedRecord.visitTime}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 mt-3 md:mt-4">
                <div className="bg-white/15 rounded-lg p-2.5 md:p-3">
                  <div className="flex items-center gap-1 text-xs text-blue-100 mb-1"><Target className="w-3 h-3" /> 本次目标</div>
                  <p className="text-xs md:text-sm font-medium line-clamp-2">{selectedRecord.target}</p>
                </div>
                <div className="bg-white/15 rounded-lg p-2.5 md:p-3">
                  <div className="flex items-center gap-1 text-xs text-blue-100 mb-1"><MessageSquare className="w-3 h-3" /> 推荐切入</div>
                  <p className="text-xs md:text-sm font-medium line-clamp-2">{selectedBattleCard?.aiSuggestions.opening || '-'}</p>
                </div>
                <div className="bg-white/15 rounded-lg p-2.5 md:p-3">
                  <div className="flex items-center gap-1 text-xs text-blue-100 mb-1"><AlertTriangle className="w-3 h-3" /> 风险提醒</div>
                  <p className="text-xs md:text-sm font-medium line-clamp-2">{selectedBattleCard?.riskReminder.riskItems[0] || '-'}</p>
                </div>
              </div>
            </div>
            <div className="flex md:flex-col gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-white text-blue-700 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
                查看作战卡
              </button>
              <button
                onClick={handleStartVisit}
                className="flex-1 md:flex-none bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-400 transition-colors whitespace-nowrap flex items-center justify-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" /> 开始拜访
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Progress */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="card flex items-center gap-2 md:gap-4 p-3 md:p-5">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-sm text-gray-500 truncate">本周待拜访</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">5</p>
          </div>
        </div>
        <div className="card flex items-center gap-2 md:gap-4 p-3 md:p-5">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-sm text-gray-500 truncate">本周已完成</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="card flex items-center gap-2 md:gap-4 p-3 md:p-5">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
            <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-sm text-gray-500 truncate">本月累计</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">18</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today Visit Plan List */}
        <div className="lg:col-span-1 space-y-2 md:space-y-3">
          <h2 className="text-base md:text-lg font-bold text-gray-900">今日拜访计划</h2>
          {todayRecords.map(record => {
            const isSelected = record.id === selectedRecordId
            return (
              <div
                key={record.id}
                onClick={() => setSelectedRecordId(record.id)}
                className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200'
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-gray-900 text-sm">{record.doctorName}</span>
                    <span className="text-[10px] md:text-xs text-gray-500 truncate">{record.hospital}</span>
                  </div>
                  <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    record.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {record.priority === 'high' ? '高优先' : '中优先'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2">
                  <span>{record.department}</span>
                  <span>·</span>
                  <span className="text-blue-600 font-medium">{record.visitTime}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="tag-blue text-[10px] md:text-xs">{record.clientStatus}</span>
                  <span className="tag-gray text-[10px] md:text-xs">{record.visitStage}</span>
                  {record.tags.map(tag => (
                    <span key={tag} className="tag-amber text-[10px] md:text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Battle Card + AI Suggestions + Pre-visit Summary */}
        <div className="lg:col-span-2 space-y-4 md:space-y-5">
          {/* Battle Card */}
          {selectedBattleCard && (
            <div className="card">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-base md:text-lg font-bold text-gray-900">医生作战卡</h2>
              </div>

              <div className="space-y-3 md:space-y-4">
                {/* Basic Info */}
                <div className="flex items-center gap-3 p-2.5 md:p-3 bg-gray-50 rounded-lg">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm md:text-base shrink-0">
                    {selectedBattleCard.basicInfo.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{selectedBattleCard.basicInfo.name}</span>
                      <span className="text-xs text-gray-500">{selectedBattleCard.basicInfo.title}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500">{selectedBattleCard.basicInfo.hospital} · {selectedBattleCard.basicInfo.department}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {selectedBattleCard.basicInfo.tags.map(tag => (
                        <span key={tag} className="tag-blue text-[10px] md:text-xs">{tag}</span>
                      ))}
                    </div>
                    <DataSourceBadge source={selectedBattleCard.basicInfo.source} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {/* Last Visit */}
                  <div className="p-2.5 md:p-3 bg-gray-50 rounded-lg">
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2">上次拜访摘要（{selectedBattleCard.lastVisitSummary.date}）</p>
                    <p className="text-xs md:text-sm text-gray-700 mb-1"><span className="font-medium">主题：</span>{selectedBattleCard.lastVisitSummary.topic}</p>
                    <p className="text-xs md:text-sm text-gray-700 mb-1"><span className="font-medium">反馈：</span>{selectedBattleCard.lastVisitSummary.doctorFeedback}</p>
                    <div className="mt-2">
                      <p className="text-[10px] md:text-xs text-gray-500 mb-1">未完成事项：</p>
                      {selectedBattleCard.lastVisitSummary.pendingItems.map((item, i) => (
                        <p key={i} className="text-[10px] md:text-xs text-amber-700 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3" /> {item}
                        </p>
                      ))}
                    </div>
                    <DataSourceBadge source={selectedBattleCard.lastVisitSummary.source} />
                  </div>

                  {/* This Visit Goal + Risk */}
                  <div className="space-y-2 md:space-y-3">
                    <div className="p-2.5 md:p-3 bg-blue-50 rounded-lg">
                      <p className="text-[10px] md:text-xs text-blue-600 mb-1">本次拜访目标</p>
                      <p className="text-xs md:text-sm font-medium text-blue-900">{selectedBattleCard.thisVisitGoal.goal}</p>
                      <p className="text-[10px] md:text-xs text-blue-700 mt-1">成功标准：{selectedBattleCard.thisVisitGoal.successCriteria}</p>
                      <DataSourceBadge source={selectedBattleCard.thisVisitGoal.source} />
                    </div>
                    <div className="p-2.5 md:p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-1 text-[10px] md:text-xs text-red-600 mb-1"><Shield className="w-3 h-3 md:w-3.5 md:h-3.5" /> 风险提醒</div>
                      {selectedBattleCard.riskReminder.riskItems.map((r, i) => (
                        <p key={i} className="text-[10px] md:text-xs text-red-700">· {r}</p>
                      ))}
                      <div className="mt-1 pt-1 border-t border-red-100">
                        {selectedBattleCard.riskReminder.complianceBoundaries.map((b, i) => (
                          <p key={i} className="text-[10px] md:text-xs text-red-600">合规：{b}</p>
                        ))}
                      </div>
                      <DataSourceBadge source={selectedBattleCard.riskReminder.source} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {selectedBattleCard && (
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-base md:text-lg font-bold text-blue-900">AI 建议</h2>
              </div>
              <div className="space-y-3">
                <AISuggestionRow label="建议开场" content={selectedBattleCard.aiSuggestions.opening} color="blue" />
                <AISuggestionRow label="建议重点" content={selectedBattleCard.aiSuggestions.priority} color="emerald" />
                <AISuggestionRow label="风险提醒" content={selectedBattleCard.aiSuggestions.risk} color="amber" />
              </div>
              <DataSourceBadge source={selectedBattleCard.aiSuggestions.source} />
            </div>
          )}

          {/* Pre-visit Summary */}
          {selectedBattleCard && (
            <div className="card">
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">拜访前摘要</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <SummaryItem label="目标" value={selectedBattleCard.preVisitSummary.goal} />
                <SummaryItem label="成功标准" value={selectedBattleCard.preVisitSummary.successCriteria} />
                <SummaryItem label="推荐开场" value={selectedBattleCard.preVisitSummary.recommendedOpening} />
                <SummaryItem label="本次重点" value={selectedBattleCard.preVisitSummary.keyPoints.join('、')} />
                <div className="md:col-span-2">
                  <p className="text-[10px] md:text-xs text-gray-500 mb-1">医生可能会问</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selectedBattleCard.preVisitSummary.doctorMayAsk.map((q, i) => (
                      <span key={i} className="tag-amber text-[10px] md:text-xs">{q}</span>
                    ))}
                  </div>
                </div>
              </div>
              <DataSourceBadge source={selectedBattleCard.preVisitSummary.source} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AISuggestionRow({ label, content, color }: { label: string; content: string; color: 'blue' | 'emerald' | 'amber' }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
  }
  return (
    <div className="flex items-start gap-2 md:gap-3">
      <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded shrink-0 mt-0.5 ${colors[color]}`}>{label}</span>
      <p className="text-xs md:text-sm text-gray-800 leading-relaxed">{content}</p>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] md:text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xs md:text-sm font-medium text-gray-900">{value}</p>
    </div>
  )
}
