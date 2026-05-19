import { useState } from 'react'
import {
  Users, Activity, FileCheck, TrendingUp, BarChart3, PieChart,
  Shield, CheckCircle2, XCircle, Clock, AlertTriangle, Sparkles,
  Award, BookOpen, UserCog, Zap, Target
} from 'lucide-react'

const complianceLogs = [
  { id: 'C001', type: '拦截', content: '超适应症推广内容', user: '王明', time: '2025-05-18 10:23', status: '已拦截', rule: '超适应症检测规则', basis: '检测到未获批适应症表述' },
  { id: 'C002', type: '预警', content: '竞品对比数据未标注来源', user: '李红', time: '2025-05-18 09:45', status: '已修正', rule: '数据来源标注规则', basis: '竞品对比未附带引用' },
  { id: 'C003', type: '通过', content: '药品说明书查询', user: '王明', time: '2025-05-18 09:12', status: '合规', rule: '-', basis: '在说明书范围内' },
  { id: 'C004', type: '通过', content: '临床指南推荐等级查询', user: '张华', time: '2025-05-18 08:56', status: '合规', rule: '-', basis: '引用官方指南' },
  { id: 'C005', type: '拦截', content: '未备案推广话术', user: '赵强', time: '2025-05-17 16:30', status: '已拦截', rule: '备案内容校验规则', basis: '话术未在备案库中' },
]

const visitTrend = [
  { day: '周一', planned: 5, completed: 4 },
  { day: '周二', planned: 7, completed: 6 },
  { day: '周三', planned: 4, completed: 3 },
  { day: '周四', planned: 6, completed: 5 },
  { day: '周五', planned: 8, completed: 7 },
  { day: '周六', planned: 2, completed: 2 },
  { day: '周日', planned: 1, completed: 1 },
]

const repPerformance = [
  { name: '王明', product: '心血管线', region: '华北', visits: 28, completion: '93%', satisfaction: 4.5, aiUsage: '78%', status: '活跃', warning: false },
  { name: '李红', product: '内分泌线', region: '华东', visits: 24, completion: '86%', satisfaction: 4.3, aiUsage: '65%', status: '活跃', warning: false },
  { name: '张华', product: '神经线', region: '西南', visits: 31, completion: '97%', satisfaction: 4.7, aiUsage: '82%', status: '活跃', warning: false },
  { name: '赵强', product: '呼吸线', region: '华南', visits: 19, completion: '68%', satisfaction: 4.1, aiUsage: '45%', status: '活跃', warning: true },
  { name: '陈丽', product: '肿瘤线', region: '华北', visits: 15, completion: '75%', satisfaction: 4.4, aiUsage: '60%', status: '休假', warning: false },
  { name: '孙伟', product: '心血管线', region: '华东', visits: 8, completion: '40%', satisfaction: 3.8, aiUsage: '30%', status: '新人保护期', warning: true },
]

const profileQuality = [
  { doctorId: 'DOC001', name: '张伟', completeness: 95, accuracy: '已核验', lastUpdate: '2025-05-16', missingFields: '-', sourceCount: 4 },
  { doctorId: 'DOC002', name: '李芳', completeness: 88, accuracy: '已核验', lastUpdate: '2025-05-15', missingFields: '学术职务', sourceCount: 3 },
  { doctorId: 'DOC003', name: '王强', completeness: 92, accuracy: '已核验', lastUpdate: '2025-05-14', missingFields: '-', sourceCount: 4 },
  { doctorId: 'DOC004', name: '陈静', completeness: 65, accuracy: '待核验', lastUpdate: '2025-05-10', missingFields: '学术数据、社交关系', sourceCount: 2 },
  { doctorId: 'DOC005', name: '刘洋', completeness: 90, accuracy: '已核验', lastUpdate: '2025-05-17', missingFields: '-', sourceCount: 3 },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { key: 'overview', label: '数据概览', icon: BarChart3 },
    { key: 'performance', label: '代表效能', icon: Zap },
    { key: 'quality', label: '画像质量', icon: Target },
    { key: 'compliance', label: '合规审核', icon: Shield },
  ]

  const maxVal = Math.max(...visitTrend.map(d => Math.max(d.planned, d.completed)))

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <UserCog className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">管理后台</h1>
        </div>
        <p className="text-xs md:text-sm text-gray-500">区域经理视角 · 华北区 · 数据截至 2025-05-18</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 md:gap-2 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === 'overview' && (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <AdminStatCard icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />} label="辖区内代表" value="12" change="+2 新人" />
            <AdminStatCard icon={<Activity className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />} label="本月拜访数" value="98" change="+8% 环比" />
            <AdminStatCard icon={<FileCheck className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />} label="画像完整度" value="87%" change="+3%" />
            <AdminStatCard icon={<Shield className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />} label="合规拦截率" value="0.8%" change="-0.3%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Visit Trend */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-sm md:text-base font-bold text-gray-900">本周拜访趋势</h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                {visitTrend.map(d => (
                  <div key={d.day}>
                    <div className="flex items-center justify-between text-xs md:text-sm mb-1 md:mb-1.5">
                      <span className="text-gray-600 w-8 md:w-10">{d.day}</span>
                      <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-[10px] md:text-xs text-gray-500">计划 {d.planned}</span>
                        <span className="text-[10px] md:text-xs text-emerald-600 font-medium">完成 {d.completed}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="flex-1 h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-300 rounded-full" style={{ width: `${(d.planned / maxVal) * 100}%` }} />
                      </div>
                      <div className="flex-1 h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(d.completed / maxVal) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-[10px] md:text-xs">
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-300 rounded-full" /><span className="text-gray-500">计划</span></div>
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 rounded-full" /><span className="text-gray-500">已完成</span></div>
              </div>
            </div>

            {/* Doctor Coverage */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <PieChart className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                <h2 className="text-sm md:text-base font-bold text-gray-900">医生覆盖分布</h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                {[
                  { region: '华北区（本区）', count: 52, total: 186, color: 'bg-blue-500' },
                  { region: '华东区', count: 48, total: 186, color: 'bg-emerald-500' },
                  { region: '华南区', count: 35, total: 186, color: 'bg-purple-500' },
                  { region: '西南区', count: 28, total: 186, color: 'bg-amber-500' },
                  { region: '其他', count: 23, total: 186, color: 'bg-gray-400' },
                ].map(item => (
                  <div key={item.region}>
                    <div className="flex items-center justify-between text-xs md:text-sm mb-1 md:mb-1.5">
                      <span className="text-gray-600">{item.region}</span>
                      <span className="text-gray-900 font-medium">{item.count} 人 ({((item.count / item.total) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / item.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Region Ranking + Product Line */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                <h2 className="text-sm md:text-base font-bold text-gray-900">区域拜访排名（本月）</h2>
              </div>
              <div className="space-y-2.5 md:space-y-3">
                {[
                  { rank: 1, region: '华东区', visits: 128, manager: '李经理', change: '+12%' },
                  { rank: 2, region: '华北区（本区）', visits: 98, manager: '王经理', change: '+8%' },
                  { rank: 3, region: '华南区', visits: 76, manager: '张经理', change: '-3%' },
                  { rank: 4, region: '西南区', visits: 40, manager: '赵经理', change: '+5%' },
                ].map(r => (
                  <div key={r.rank} className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg bg-gray-50">
                    <span className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                      r.rank === 1 ? 'bg-amber-100 text-amber-700' : r.rank === 2 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
                    }`}>{r.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{r.region}</p>
                      <p className="text-[10px] md:text-xs text-gray-500">负责人：{r.manager}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-900">{r.visits}次</p>
                      <p className={`text-[10px] md:text-xs ${r.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{r.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-sm md:text-base font-bold text-gray-900">产品线覆盖对比</h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                {[
                  { name: '心血管线', doctors: 52, target: 60, color: 'bg-blue-500' },
                  { name: '内分泌线', doctors: 38, target: 50, color: 'bg-emerald-500' },
                  { name: '神经线', doctors: 28, target: 40, color: 'bg-purple-500' },
                  { name: '肿瘤线', doctors: 24, target: 35, color: 'bg-amber-500' },
                  { name: '呼吸线', doctors: 18, target: 30, color: 'bg-pink-500' },
                ].map(p => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between text-xs md:text-sm mb-1 md:mb-1.5">
                      <span className="text-gray-600">{p.name}</span>
                      <span className="text-gray-900 font-medium">{p.doctors}/{p.target} 人 ({((p.doctors / p.target) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 md:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${p.color} rounded-full`} style={{ width: `${Math.min((p.doctors / p.target) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== PERFORMANCE TAB ===== */}
      {activeTab === 'performance' && (
        <div className="space-y-4 md:space-y-6">
          {/* Warning Banner */}
          <div className="card bg-red-50 border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
              <h2 className="text-sm md:text-base font-bold text-red-900">预警名单</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {repPerformance.filter(r => r.warning).map(r => (
                <div key={r.name} className="flex items-center gap-3 p-2.5 md:p-3 bg-white rounded-lg border border-red-100">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-xs md:text-sm">{r.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900">{r.name} · {r.product}</p>
                    <p className="text-[10px] md:text-xs text-gray-500">拜访完成率 {r.completion} · AI使用率 {r.aiUsage}</p>
                  </div>
                  <span className="tag-red text-[10px] md:text-xs shrink-0">需关注</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Table */}
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <h2 className="text-sm md:text-base font-bold text-gray-900">代表效能对比</h2>
            </div>
            <div className="overflow-x-auto -mx-3 md:-mx-5 px-3 md:px-5">
              <table className="w-full text-xs md:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['代表', '产品线', '区域', '本月拜访', '完成率', '满意度', 'AI使用率', '状态'].map(h => (
                      <th key={h} className="text-left py-2.5 md:py-3 px-2 md:px-4 font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {repPerformance.map((u, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 md:py-3 px-2 md:px-4 font-medium text-gray-900">{u.name}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{u.product}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{u.region}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-900 font-medium">{u.visits}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <span className={`font-medium ${parseInt(u.completion) < 70 ? 'text-red-600' : 'text-emerald-600'}`}>{u.completion}</span>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <div className="flex items-center gap-1">
                          <StarIcon className={`w-3 h-3 ${u.satisfaction >= 4.0 ? 'text-amber-500' : 'text-gray-300'}`} />
                          <span className="text-gray-900">{u.satisfaction}</span>
                        </div>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 md:w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: u.aiUsage }} />
                          </div>
                          <span className="text-gray-600">{u.aiUsage}</span>
                        </div>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                          u.status === '活跃' ? 'bg-emerald-100 text-emerald-700' :
                          u.status === '休假' ? 'bg-gray-100 text-gray-600' :
                          'bg-blue-100 text-blue-700'
                        }`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== QUALITY TAB ===== */}
      {activeTab === 'quality' && (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <AdminStatCard icon={<Target className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />} label="画像平均完整度" value="87%" change="+3% 本月" />
            <AdminStatCard icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />} label="人工核验通过率" value="92%" change="+1%" />
            <AdminStatCard icon={<Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />} label="平均更新周期" value="5.2天" change="-1.3天" />
            <AdminStatCard icon={<DatabaseIcon className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />} label="数据源覆盖" value="5个平台" change="+1" />
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <h2 className="text-sm md:text-base font-bold text-gray-900">医生画像质量监控</h2>
            </div>
            <div className="overflow-x-auto -mx-3 md:-mx-5 px-3 md:px-5">
              <table className="w-full text-xs md:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['医生', '完整度', '核验状态', '最后更新', '缺失字段', '数据来源数'].map(h => (
                      <th key={h} className="text-left py-2.5 md:py-3 px-2 md:px-4 font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {profileQuality.map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 md:py-3 px-2 md:px-4 font-medium text-gray-900">{p.name}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 md:w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${p.completeness >= 90 ? 'bg-emerald-500' : p.completeness >= 70 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${p.completeness}%` }} />
                          </div>
                          <span className="text-gray-900 font-medium">{p.completeness}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                          p.accuracy === '已核验' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{p.accuracy}</span>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{p.lastUpdate}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{p.missingFields}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-900">{p.sourceCount} 个</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== COMPLIANCE TAB ===== */}
      {activeTab === 'compliance' && (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <AdminStatCard icon={<Shield className="w-4 h-4 md:w-5 md:h-5 text-red-600" />} label="今日拦截" value="3" change="-2 环比" />
            <AdminStatCard icon={<AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />} label="今日预警" value="2" change="持平" />
            <AdminStatCard icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />} label="合规通过" value="156" change="+12" />
            <AdminStatCard icon={<Target className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />} label="规则命中率" value="99.2%" change="+0.1%" />
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <h2 className="text-sm md:text-base font-bold text-gray-900">合规审核日志</h2>
            </div>
            <div className="overflow-x-auto -mx-3 md:-mx-5 px-3 md:px-5">
              <table className="w-full text-xs md:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['时间', '类型', '内容摘要', '命中规则', '判定依据', '操作人', '状态'].map(h => (
                      <th key={h} className="text-left py-2.5 md:py-3 px-2 md:px-4 font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {complianceLogs.map(log => (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600 whitespace-nowrap">{log.time}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                          log.type === '拦截' ? 'bg-red-100 text-red-700' :
                          log.type === '预警' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>{log.type}</span>
                      </td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-900 max-w-[120px] md:max-w-none truncate">{log.content}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{log.rule}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-500 max-w-[120px] md:max-w-none truncate">{log.basis}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4 text-gray-600">{log.user}</td>
                      <td className="py-2.5 md:py-3 px-2 md:px-4">
                        <span className="flex items-center gap-1 text-[10px] md:text-xs">
                          {log.status === '合规' ? (
                            <><CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" /><span className="text-emerald-600">{log.status}</span></>
                          ) : log.status === '已拦截' ? (
                            <><XCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-600" /><span className="text-red-600">{log.status}</span></>
                          ) : (
                            <><Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600" /><span className="text-blue-600">{log.status}</span></>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminStatCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: string }) {
  return (
    <div className="card p-3 md:p-5">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-lg flex items-center justify-center">{icon}</div>
      </div>
      <p className="text-[10px] md:text-sm text-gray-500">{label}</p>
      <p className="text-lg md:text-2xl font-bold text-gray-900 mt-0.5 md:mt-1">{value}</p>
      <p className="text-[10px] md:text-xs text-emerald-600 font-medium mt-1 md:mt-2">{change}</p>
    </div>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}
