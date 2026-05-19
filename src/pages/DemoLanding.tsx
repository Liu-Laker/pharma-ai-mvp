import { useNavigate } from 'react-router-dom'
import { Sparkles, ClipboardList, Radio, FileCheck } from 'lucide-react'

export default function DemoLanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                <Sparkles className="w-4 h-4" /> 产品首页
              </div>
              <h1 className="mt-4 text-3xl font-bold text-slate-900">智能拜访副驾</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                这是产品的首屏入口，面向医药代表和营销经理，覆盖拜访准备、现场辅导、会后总结。
                直接进入核心场景，即可体验完整产品流程。
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-5 py-4 text-white shadow-lg">
              <p className="text-sm text-slate-300">演示建议路径</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>1. 今日拜访助手 → 了解医生作战卡</li>
                <li>2. 拜访中副驾 → 展示实时建议与风险提醒</li>
                <li>3. 会后纪要 → 演示自动回填 CRM</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: '今日拜访助手',
              desc: '展示医生背景、目标与推荐切入点，适合拜访前准备环节。',
              icon: ClipboardList,
              action: () => navigate('/prep'),
            },
            {
              title: '拜访中副驾',
              desc: '展示实时会议记录、AI 语义建议与风险提醒。',
              icon: Radio,
              action: () => navigate('/copilot'),
            },
            {
              title: '会后纪要',
              desc: '自动生成结构化纪要并确认回填 CRM。',
              icon: FileCheck,
              action: () => navigate('/summary'),
            },
          ].map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.title}
                onClick={item.action}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                  进入产品
                  <ArrowIcon />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 0 1-1.414-1.414L12.172 11H4a1 1 0 1 1 0-2h8.172l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5z" clipRule="evenodd" />
    </svg>
  )
}
