export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: string;
  hospital: string;
  region: string;
  phone: string;
  status: 'active' | 'inactive' | 'new';
  priority: 'high' | 'medium' | 'low';
}

export interface DataSource {
  platform: string;
  icon: string;
  url?: string;
  updateAt: string;
}

export interface BattleCard {
  doctorId: string;
  basicInfo: {
    name: string;
    title: string;
    hospital: string;
    department: string;
    tags: string[];
    source: DataSource;
  };
  lastVisitSummary: {
    date: string;
    topic: string;
    doctorFeedback: string;
    pendingItems: string[];
    source: DataSource;
  };
  thisVisitGoal: {
    goal: string;
    successCriteria: string;
    source: DataSource;
  };
  riskReminder: {
    riskItems: string[];
    complianceBoundaries: string[];
    source: DataSource;
  };
  aiSuggestions: {
    opening: string;
    priority: string;
    risk: string;
    source: DataSource;
  };
  preVisitSummary: {
    goal: string;
    recommendedOpening: string;
    keyPoints: string[];
    doctorMayAsk: string[];
    successCriteria: string;
    source: DataSource;
  };
}

export interface VisitRecord {
  id: string;
  doctorId: string;
  doctorName: string;
  hospital: string;
  department: string;
  visitDate: string;
  visitTime: string;
  target: string;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  clientStatus: '高潜' | '重点维护' | '持续跟进';
  visitStage: '初访' | '跟进' | '维护';
  priorityAction: string;
  tags: string[];
}

export interface CopilotState {
  status: 'listening' | 'paused' | 'ended';
  duration: string;
  currentStage: '开场阶段' | '需求确认' | '重点讲解' | '异议处理' | '收尾';
  currentFocus: string;
  currentSuggestion: {
    suggestion: string;
    reason: string;
    priority: '高' | '中' | '低';
  };
  uncoveredPoints: string[];
  suggestedSupplements: string[];
  riskAlerts: string[];
  transcript: { time: string; speaker: string; text: string; summary?: string }[];
  glassPreview: {
    suggestion: string;
    focus: string;
    risk: string;
  };
}

export interface VisitSummaryData {
  visitId: string;
  doctorId: string;
  doctorName: string;
  visitDate: string;
  visitTime: string;
  duration: string;
  summary: string;
  feedbackTags: {
    concern: string[];
    intent: string[];
    risk: string[];
  };
  nextActions: {
    action: string;
    priority: '高' | '中' | '低';
    suggestedTime: string;
  }[];
  aiExtracted: {
    field: string;
    value: string;
    basis: string;
  }[];
  crmFields: {
    visitStatus: string;
    nextAction: string;
    priority: string;
    remark: string;
  };
}

export interface Notification {
  id: string;
  type: 'visit' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ========== Data Source Helpers ==========
const srcHospital = (): DataSource => ({ platform: '医院官网', icon: '🏥', updateAt: '2025-05-15' });
const srcHaodf = (): DataSource => ({ platform: '好大夫在线', icon: '📰', updateAt: '2025-05-16' });
const srcWeiyi = (): DataSource => ({ platform: '微医', icon: '📱', updateAt: '2025-05-16' });
const srcDxy = (): DataSource => ({ platform: '丁香园', icon: '🔬', updateAt: '2025-05-10' });
const srcCRM = (): DataSource => ({ platform: 'CRM系统', icon: '💼', updateAt: '2025-05-18' });
const srcAI = (): DataSource => ({ platform: 'AI生成', icon: '✨', updateAt: '2025-05-18' });

// ========== Mock Doctors ==========
export const doctors: Doctor[] = [
  { id: 'DOC001', name: '张伟', title: '主任医师', department: '心内科', hospital: '北京协和医院', region: '华北', phone: '138****1234', status: 'active', priority: 'high' },
  { id: 'DOC002', name: '李芳', title: '副主任医师', department: '内分泌科', hospital: '上海瑞金医院', region: '华东', phone: '139****5678', status: 'active', priority: 'high' },
  { id: 'DOC003', name: '王强', title: '主任医师', department: '神经内科', hospital: '华西医院', region: '西南', phone: '137****9012', status: 'active', priority: 'high' },
  { id: 'DOC004', name: '陈静', title: '主治医师', department: '呼吸内科', hospital: '广州医科大学附属第一医院', region: '华南', phone: '136****3456', status: 'active', priority: 'medium' },
  { id: 'DOC005', name: '刘洋', title: '主任医师', department: '肿瘤科', hospital: '中山大学肿瘤防治中心', region: '华南', phone: '135****7890', status: 'active', priority: 'high' },
];

// ========== Mock Battle Cards ==========
export const battleCards: BattleCard[] = [
  {
    doctorId: 'DOC001',
    basicInfo: {
      name: '张伟', title: '主任医师', hospital: '北京协和医院', department: '心内科',
      tags: ['高血压', '心力衰竭', '冠心病'],
      source: srcHospital(),
    },
    lastVisitSummary: {
      date: '2025-04-15',
      topic: '讨论新型降压药在老年患者中的疗效',
      doctorFeedback: '对真实世界研究数据比较感兴趣，但担心医保报销问题',
      pendingItems: ['待提供医保报销流程说明', '待发送真实世界研究文献'],
      source: srcCRM(),
    },
    thisVisitGoal: {
      goal: '介绍新品降压药的临床数据，推动处方试用',
      successCriteria: '医生同意为2-3位患者处方试用',
      source: srcCRM(),
    },
    riskReminder: {
      riskItems: ['医生对价格敏感', '竞品A已占据较高份额'],
      complianceBoundaries: ['不提及未获批适应症', '不贬低竞品'],
      source: srcAI(),
    },
    aiSuggestions: {
      opening: '张主任，上次提到的真实世界研究数据我已经整理好了，正好今天跟您汇报一下',
      priority: '重点展示24小时血压平滑指数优势数据，提及医保已纳入目录',
      risk: '避免与竞品A做直接疗效对比，可提安全性数据',
      source: srcAI(),
    },
    preVisitSummary: {
      goal: '介绍新品降压药的临床数据，推动处方试用',
      recommendedOpening: '张主任，上次提到的真实世界研究数据我已经整理好了',
      keyPoints: ['24小时血压平滑指数优势', '不良反应发生率更低', '医保已纳入目录'],
      doctorMayAsk: ['与竞品A的价格对比', '老年患者的安全性数据', '医保报销比例'],
      successCriteria: '医生同意为2-3位患者处方试用',
      source: srcAI(),
    },
  },
  {
    doctorId: 'DOC002',
    basicInfo: {
      name: '李芳', title: '副主任医师', hospital: '上海瑞金医院', department: '内分泌科',
      tags: ['2型糖尿病', '甲状腺疾病'],
      source: srcHaodf(),
    },
    lastVisitSummary: {
      date: '2025-05-10',
      topic: '跟进GLP-1产品使用情况',
      doctorFeedback: '患者体重管理效果反馈不错，希望了解更多个体化方案',
      pendingItems: ['待分享最新ADA指南推荐更新'],
      source: srcCRM(),
    },
    thisVisitGoal: {
      goal: '跟进GLP-1产品使用反馈，推荐个体化治疗方案',
      successCriteria: '医生同意扩大处方范围至更多肥胖型2型糖尿病患者',
      source: srcCRM(),
    },
    riskReminder: {
      riskItems: ['医生对患者依从性有顾虑'],
      complianceBoundaries: ['不夸大减重效果', '不暗示可替代饮食运动'],
      source: srcAI(),
    },
    aiSuggestions: {
      opening: '李主任，上次您提到的患者体重管理反馈，我这边也收集了一些真实案例',
      priority: '分享最新ADA指南推荐更新，讨论个体化剂量调整方案',
      risk: '避免承诺具体减重数值，强调个体差异性',
      source: srcAI(),
    },
    preVisitSummary: {
      goal: '跟进GLP-1产品使用反馈，推荐个体化治疗方案',
      recommendedOpening: '李主任，上次您提到的患者体重管理反馈，我这边也收集了一些真实案例',
      keyPoints: ['ADA指南A级推荐', '个体化剂量调整方案', '真实世界减重数据'],
      doctorMayAsk: ['患者体重反弹问题', '与SGLT2i的联合使用', '长期安全性数据'],
      successCriteria: '医生同意扩大处方范围',
      source: srcAI(),
    },
  },
  {
    doctorId: 'DOC003',
    basicInfo: {
      name: '王强', title: '主任医师', hospital: '华西医院', department: '神经内科',
      tags: ['脑卒中', '帕金森病'],
      source: srcHospital(),
    },
    lastVisitSummary: {
      date: '2025-05-12',
      topic: '讨论脑卒中二级预防方案',
      doctorFeedback: '对CHANCE-2研究数据感兴趣，关注双抗治疗方案',
      pendingItems: ['待准备CHANCE-2研究详细数据'],
      source: srcCRM(),
    },
    thisVisitGoal: {
      goal: '介绍双抗治疗方案的临床数据，讨论科室会安排',
      successCriteria: '医生同意在科室内分享双抗治疗方案',
      source: srcCRM(),
    },
    riskReminder: {
      riskItems: ['医生关注出血风险', '对不良反应监测要求严格'],
      complianceBoundaries: ['不夸大疗效', '准确描述出血风险概率'],
      source: srcAI(),
    },
    aiSuggestions: {
      opening: '王主任，CHANCE-2研究的详细数据我已经准备好了，今天正好跟您深入讨论一下',
      priority: '重点展示双抗治疗的获益-风险比，讨论科室会安排',
      risk: '必须主动提及出血风险，不可回避',
      source: srcAI(),
    },
    preVisitSummary: {
      goal: '介绍双抗治疗方案的临床数据，讨论科室会安排',
      recommendedOpening: '王主任，CHANCE-2研究的详细数据我已经准备好了',
      keyPoints: ['CHANCE-2研究关键数据', '获益-风险比分析', '科室会安排'],
      doctorMayAsk: ['出血风险具体数据', '与单抗的对比', '长期随访结果'],
      successCriteria: '医生同意在科室内分享',
      source: srcAI(),
    },
  },
  {
    doctorId: 'DOC004',
    basicInfo: {
      name: '陈静', title: '主治医师', hospital: '广州医科大学附属第一医院', department: '呼吸内科',
      tags: ['慢阻肺', '哮喘'],
      source: srcWeiyi(),
    },
    lastVisitSummary: {
      date: '2025-03-20',
      topic: '推广新型吸入制剂',
      doctorFeedback: '对吸入装置演示感兴趣，希望有患者教育材料',
      pendingItems: ['待准备吸入装置演示道具'],
      source: srcCRM(),
    },
    thisVisitGoal: {
      goal: '演示新型吸入装置，提供患者教育材料',
      successCriteria: '医生同意为5位患者试用新型吸入制剂',
      source: srcCRM(),
    },
    riskReminder: {
      riskItems: ['医生对价格敏感', '患者教育材料需求高'],
      complianceBoundaries: ['不承诺疗效', '准确描述装置使用方法'],
      source: srcAI(),
    },
    aiSuggestions: {
      opening: '陈医生，上次您提到的吸入装置演示，我今天带了道具过来',
      priority: '现场演示装置操作，提供患者教育材料',
      risk: '避免过度承诺疗效，强调正确使用的重要性',
      source: srcAI(),
    },
    preVisitSummary: {
      goal: '演示新型吸入装置，提供患者教育材料',
      recommendedOpening: '陈医生，上次您提到的吸入装置演示，我今天带了道具过来',
      keyPoints: ['装置操作演示', '依从性数据', '患者教育材料'],
      doctorMayAsk: ['装置清洁维护', '与现有产品的价格对比', '老年患者使用难度'],
      successCriteria: '医生同意为5位患者试用',
      source: srcAI(),
    },
  },
  {
    doctorId: 'DOC005',
    basicInfo: {
      name: '刘洋', title: '主任医师', hospital: '中山大学肿瘤防治中心', department: '肿瘤科',
      tags: ['肺癌', '免疫治疗'],
      source: srcDxy(),
    },
    lastVisitSummary: {
      date: '2025-05-14',
      topic: '介绍免疫治疗新适应症',
      doctorFeedback: '对新适应症III期数据感兴趣，希望参与多中心研究',
      pendingItems: ['待准备新适应症III期临床数据'],
      source: srcCRM(),
    },
    thisVisitGoal: {
      goal: '介绍免疫治疗新适应症III期数据，邀请参与多中心研究',
      successCriteria: '医生同意参与多中心研究',
      source: srcCRM(),
    },
    riskReminder: {
      riskItems: ['医生关注免疫相关不良反应', '医保准入问题'],
      complianceBoundaries: ['不夸大生存获益', '准确描述irAE发生率'],
      source: srcAI(),
    },
    aiSuggestions: {
      opening: '刘主任，新适应症的III期临床数据已经发表了，今天正好跟您分享',
      priority: '重点展示III期OS/PFS数据，讨论多中心研究入组',
      risk: '必须主动提及irAE管理，不可回避不良反应',
      source: srcAI(),
    },
    preVisitSummary: {
      goal: '介绍免疫治疗新适应症III期数据，邀请参与多中心研究',
      recommendedOpening: '刘主任，新适应症的III期临床数据已经发表了',
      keyPoints: ['III期OS/PFS数据', 'irAE管理方案', '多中心研究入组'],
      doctorMayAsk: ['免疫相关不良反应处理', '医保准入进展', '长期生存数据'],
      successCriteria: '医生同意参与多中心研究',
      source: srcAI(),
    },
  },
];

// ========== Mock Visit Records ==========
export const visitRecords: VisitRecord[] = [
  {
    id: 'VIS001', doctorId: 'DOC001', doctorName: '张伟', hospital: '北京协和医院', department: '心内科',
    visitDate: '2025-05-18', visitTime: '14:30', target: '介绍新品降压药的临床数据，推动处方试用',
    status: 'pending', priority: 'high', clientStatus: '重点维护', visitStage: '跟进',
    priorityAction: '提供真实世界研究数据', tags: ['高优先', '本周必访'],
  },
  {
    id: 'VIS002', doctorId: 'DOC002', doctorName: '李芳', hospital: '上海瑞金医院', department: '内分泌科',
    visitDate: '2025-05-18', visitTime: '10:00', target: '跟进GLP-1产品使用反馈',
    status: 'pending', priority: 'high', clientStatus: '高潜', visitStage: '跟进',
    priorityAction: '分享最新ADA指南', tags: ['高优先'],
  },
  {
    id: 'VIS003', doctorId: 'DOC003', doctorName: '王强', hospital: '华西医院', department: '神经内科',
    visitDate: '2025-05-19', visitTime: '15:00', target: '介绍双抗治疗方案临床数据',
    status: 'pending', priority: 'high', clientStatus: '重点维护', visitStage: '跟进',
    priorityAction: '准备CHANCE-2研究数据', tags: ['高优先', '本周必访'],
  },
  {
    id: 'VIS004', doctorId: 'DOC004', doctorName: '陈静', hospital: '广州医科大学附属第一医院', department: '呼吸内科',
    visitDate: '2025-05-20', visitTime: '09:00', target: '演示新型吸入装置',
    status: 'pending', priority: 'medium', clientStatus: '持续跟进', visitStage: '初访',
    priorityAction: '准备吸入装置演示道具', tags: [],
  },
  {
    id: 'VIS005', doctorId: 'DOC005', doctorName: '刘洋', hospital: '中山大学肿瘤防治中心', department: '肿瘤科',
    visitDate: '2025-05-19', visitTime: '14:00', target: '介绍免疫治疗新适应症',
    status: 'pending', priority: 'high', clientStatus: '高潜', visitStage: '跟进',
    priorityAction: '准备III期临床数据', tags: ['高优先'],
  },
];

// ========== Mock Copilot State ==========
export const copilotState: CopilotState = {
  status: 'paused',
  duration: '12:34',
  currentStage: '重点讲解',
  currentFocus: '24小时血压平滑指数优势数据',
  currentSuggestion: {
    suggestion: '可以进一步追问："张主任，您科室里像这类需要长期血压管理的患者，目前最大的痛点是什么？"',
    reason: '医生已对产品数据表示认可，此时引导医生表达临床痛点，可顺势推荐本品优势',
    priority: '高',
  },
  uncoveredPoints: ['医保报销比例具体数字', '竞品A的头对头研究数据', '老年患者安全性数据'],
  suggestedSupplements: ['补充医保目录纳入时间', '提及不良反应发生率对比'],
  riskAlerts: ['避免承诺具体疗效数据', '不要贬低竞品A'],
  transcript: [
    { time: '00:00', speaker: '代表', text: '张主任，上次提到的真实世界研究数据我已经整理好了', summary: '开场，承接上次拜访' },
    { time: '00:45', speaker: '医生', text: '哦，数据怎么样？', summary: '医生表现出兴趣' },
    { time: '01:20', speaker: '代表', text: '数据显示24小时血压平滑指数显著优于对照组', summary: '重点讲解产品优势' },
    { time: '02:15', speaker: '医生', text: '这个数据看起来不错', summary: '医生认可产品数据' },
    { time: '03:00', speaker: '代表', text: '而且医保已经纳入目录了', summary: '提及医保利好' },
    { time: '04:10', speaker: '医生', text: '那价格怎么样？', summary: '医生关注价格' },
    { time: '05:30', speaker: '代表', text: '日治疗费用与竞品A相当', summary: '价格对比' },
    { time: '08:00', speaker: '医生', text: '可以考虑给几位患者试试', summary: '医生表达试用意愿' },
    { time: '10:15', speaker: '代表', text: '太好了，我可以提供一些样本', summary: '推进样品提供' },
    { time: '12:34', speaker: '系统', text: '[当前会话]', summary: '' },
  ],
  glassPreview: {
    suggestion: '追问医生科室痛点',
    focus: '血压平滑指数',
    risk: '避免贬低竞品',
  },
};

// ========== Mock Visit Summary ==========
export const visitSummaryData: VisitSummaryData = {
  visitId: 'VIS001', doctorId: 'DOC001', doctorName: '张伟',
  visitDate: '2025-05-18', visitTime: '14:30', duration: '28分钟',
  summary: '本次拜访围绕新型降压药展开。代表向张主任展示了24小时血压平滑指数的临床数据，张主任对数据表示认可。随后讨论了医保纳入目录和价格问题，张主任表示日治疗费用与竞品相当可以接受。最终张主任同意为2-3位患者处方试用，并索要了样品。',
  feedbackTags: {
    concern: ['关注安全性', '关注医保报销'],
    intent: ['有资料需求', '有试用意愿'],
    risk: ['对价格敏感'],
  },
  nextActions: [
    { action: '发送真实世界研究文献', priority: '高', suggestedTime: '2025-05-19' },
    { action: '提供医保报销流程说明', priority: '高', suggestedTime: '2025-05-19' },
    { action: '安排样品配送', priority: '高', suggestedTime: '2025-05-18' },
    { action: '跟进患者试用反馈', priority: '中', suggestedTime: '2025-05-25' },
  ],
  aiExtracted: [
    { field: '拜访状态', value: '已完成', basis: '对话确认资料已触达且医生表达试用意愿' },
    { field: '医生意向', value: '高', basis: '医生同意为2-3位患者处方试用并索要样品' },
    { field: '需求方向', value: '学术支持+样品', basis: '医生索要研究文献和样品' },
    { field: '下步动作', value: '发送文献+安排样品+跟进反馈', basis: '医生明确表达后续需求' },
    { field: '优先级', value: '高', basis: '医生为科室主任且意向明确' },
  ],
  crmFields: {
    visitStatus: '已完成',
    nextAction: '发送真实世界研究文献、安排样品配送、跟进患者试用反馈',
    priority: '高',
    remark: '张主任对24小时血压平滑指数数据表示认可，同意为2-3位患者处方试用。关注医保报销和价格问题。',
  },
};

// ========== Mock Notifications ==========
export const notifications: Notification[] = [
  { id: 'N001', type: 'visit', title: '拜访提醒', message: '14:30 张伟主任 - 北京协和医院心内科', time: '10分钟前', read: false },
  { id: 'N002', type: 'system', title: '系统更新', message: '医生画像数据已更新（2025-05-18）', time: '1小时前', read: false },
  { id: 'N003', type: 'alert', title: '合规预警', message: '拜访中检测到潜在风险表述，已自动提醒', time: '2小时前', read: true },
  { id: 'N004', type: 'visit', title: '拜访完成', message: '李芳主任拜访已记录，AI生成纪要', time: '3小时前', read: true },
];
