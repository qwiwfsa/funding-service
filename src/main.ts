// 资金业务展示平台 - 主入口

// SVG Icons as components
const icons = {
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`,
  account: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  bank: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>`,
  exchange: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"></path><path d="M8 3H3v5"></path><path d="M21 3l-7 7"></path><path d="M3 3l7 7"></path><path d="M16 21h5v-5"></path><path d="M8 21H3v-5"></path><path d="M21 21l-7-7"></path><path d="M3 21l7-7"></path></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  trending: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  dollar: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
};

// Business data
const businessData = {
  listed: {
    title: '上市公司类',
    subtitle: '资本运作专业服务',
    icon: icons.building,
    color: '#FFD700',
    services: [
      { name: '上市公司短拆', desc: '快速解决上市公司短期资金周转需求' },
      { name: '股票解质押过桥', desc: '专业解押方案，助力股权流通' },
      { name: '募集账户归还过桥', desc: '合规高效，归还募集配套资金' },
      { name: '产业基金备案过桥', desc: '协助完成基金备案全流程' },
      { name: '股票质押/定增/协议转让', desc: '多元化股权融资渠道' },
      { name: '优化财务报表', desc: '专业财务优化，降低资产负债率' },
    ],
  },
  enterprise: {
    title: '企业/个人摆账类',
    subtitle: '资金实力展示专家',
    icon: icons.account,
    color: '#DAA520',
    services: [
      { name: '企业定存摆账', desc: '1-6个月大额存款摆账服务' },
      { name: '云信票据实摆', desc: '云信票据真实资金摆账' },
      { name: '过账实趴', desc: '资金过账，趴账服务' },
      { name: '抵押类过桥', desc: '房产/土地抵押过桥融资' },
      { name: '实缴验资', desc: '注册资本金实缴验资' },
      { name: '资金证明/银行保函', desc: '出具各类资金证明文件' },
      { name: '贸易增量/亮资', desc: '显账或现金亮资服务' },
    ],
  },
  bank: {
    title: '银行存款类',
    subtitle: '银行存款业务专家',
    icon: icons.bank,
    color: '#B8860B',
    services: [
      { name: '银行冲量', desc: '时点、日均、月底银行冲量' },
      { name: '定期存款', desc: '一年期/三年期大额定期存款' },
      { name: '揽储业务', desc: '合规揽储，利率优厚' },
    ],
  },
  ar: {
    title: '应收账款买断融资',
    subtitle: '创新融资解决方案',
    icon: icons.exchange,
    color: '#CD853F',
    services: [
      { name: '云信票据置换', desc: '应收账款等价置换云信票据' },
      { name: '可拆分流转', desc: '票据可拆分、可流转、可支付' },
      { name: '融资贴现', desc: '快速融资贴现，资金即时到账' },
      { name: '门槛灵活', desc: '不挑企业、不看征信、可执行诉讼' },
    ],
    scenarios: [
      '收购矿产',
      '替代保证金/保函',
      '清理三角债',
      '平应收应付',
      '归还股东占款',
      '增资产降负债',
    ],
  },
};

const agentBenefits = [
  { icon: icons.trending, title: '高额返佣', desc: '行业顶尖佣金比例，结算及时' },
  { icon: icons.shield, title: '合规保障', desc: '专业法务团队，全程合规操作' },
  { icon: icons.clock, title: '高效审批', desc: '简化流程，快速响应客户需求' },
  { icon: icons.users, title: '资源支持', desc: '丰富的客户资源池，精准匹配' },
];

const advantages = [
  '资金实力雄厚，额度充足',
  '专业团队，经验丰富',
  '操作规范，安全可靠',
  '服务全国，响应迅速',
  '价格优惠，合作共赢',
];

// Render functions
function renderNavbar(): string {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
              <span class="text-xl font-bold text-gray-900">DF</span>
            </div>
            <div>
              <h1 class="text-xl font-bold gradient-text">鼎丰资金</h1>
              <p class="text-xs text-gray-400">专业资金服务平台</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center gap-8">
            <a href="#services" class="text-gray-300 hover:text-yellow-500 transition-colors">业务服务</a>
            <a href="#advantages" class="text-gray-300 hover:text-yellow-500 transition-colors">核心优势</a>
            <a href="#agent" class="text-gray-300 hover:text-yellow-500 transition-colors">代理加盟</a>
            <a href="#contact" class="text-gray-300 hover:text-yellow-500 transition-colors">联系我们</a>
          </div>
          
          <button class="btn-gold hidden md:block">
            立即咨询
          </button>
          
          <button class="md:hidden text-gray-300" id="mobile-menu-btn">
            ${icons.menu}
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div class="hidden md:hidden bg-slate-900/95 border-t border-yellow-600/20" id="mobile-menu">
        <div class="px-4 py-4 space-y-3">
          <a href="#services" class="block text-gray-300 hover:text-yellow-500 py-2">业务服务</a>
          <a href="#advantages" class="block text-gray-300 hover:text-yellow-500 py-2">核心优势</a>
          <a href="#agent" class="block text-gray-300 hover:text-yellow-500 py-2">代理加盟</a>
          <a href="#contact" class="block text-gray-300 hover:text-yellow-500 py-2">联系我们</a>
          <button class="btn-gold w-full mt-4">立即咨询</button>
        </div>
      </div>
    </nav>
  `;
}

function renderHero(): string {
  return `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- Background decorations -->
      <div class="decorative-circle w-96 h-96 -top-20 -left-20" style="background: radial-gradient(circle, rgba(184, 134, 11, 0.15) 0%, transparent 70%);"></div>
      <div class="decorative-circle w-80 h-80 bottom-20 -right-20" style="background: radial-gradient(circle, rgba(218, 165, 32, 0.1) 0%, transparent 70%);"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/30 mb-8">
            <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span class="text-yellow-500 text-sm font-medium">专业 · 诚信 · 高效 · 共赢</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span class="gradient-text">鼎丰资金</span>
            <br>
            <span class="text-white">专业资金服务平台</span>
          </h1>
          
          <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            专注上市公司短拆、过桥、摆账、存款、应收账款融资等全方位资金解决方案
            <br>
            <span class="text-yellow-500">资金实力雄厚 | 服务全国 | 合作共赢</span>
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" class="btn-gold text-lg px-10 py-4">
              了解更多服务
              <span class="ml-2 inline-block">${icons.arrow}</span>
            </a>
            <a href="#contact" class="btn-outline text-lg px-10 py-4">
              立即咨询
            </a>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up" style="animation-delay: 0.3s;">
          <div class="text-center p-6 rounded-2xl glass card-hover">
            <div class="stat-value">500+</div>
            <p class="text-gray-400 mt-2">成功案例</p>
          </div>
          <div class="text-center p-6 rounded-2xl glass card-hover">
            <div class="stat-value">50亿+</div>
            <p class="text-gray-400 mt-2">累计交易额</p>
          </div>
          <div class="text-center p-6 rounded-2xl glass card-hover">
            <div class="stat-value">98%</div>
            <p class="text-gray-400 mt-2">客户满意度</p>
          </div>
          <div class="text-center p-6 rounded-2xl glass card-hover">
            <div class="stat-value">24h</div>
            <p class="text-gray-400 mt-2">快速响应</p>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div class="w-6 h-10 rounded-full border-2 border-yellow-600/50 flex justify-center pt-2">
          <div class="w-1.5 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  `;
}

function renderServiceCard(data: typeof businessData.listed, index: number): string {
  const isEven = index % 2 === 0;
  return `
    <div class="glass rounded-3xl p-8 md:p-10 card-hover" style="animation-delay: ${index * 0.1}s;">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-1/3">
          <div class="icon-box mb-6" style="color: ${data.color};">
            ${data.icon}
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">${data.title}</h3>
          <p class="text-sm mb-6" style="color: ${data.color};">${data.subtitle}</p>
          ${data.scenarios ? `
            <div class="bg-slate-800/50 rounded-xl p-4">
              <p class="text-sm text-gray-400 mb-3">应用场景：</p>
              <div class="flex flex-wrap gap-2">
                ${data.scenarios.map(s => `<span class="px-3 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-500 border border-yellow-600/30">${s}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="lg:w-2/3 grid sm:grid-cols-2 gap-4">
          ${data.services.map(service => `
            <div class="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 hover:border-yellow-600/30 transition-all">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-yellow-600/20 flex items-center justify-center flex-shrink-0 mt-0.5" style="color: ${data.color};">
                  ${icons.check}
                </div>
                <div>
                  <h4 class="text-white font-semibold mb-1">${service.name}</h4>
                  <p class="text-sm text-gray-400">${service.desc}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderServices(): string {
  return `
    <section id="services" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-yellow-500 font-medium mb-4 block">我们的服务</span>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
            全方位资金解决方案
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            专业团队提供一站式资金服务，覆盖上市公司、企业个人、银行存款及应收账款融资等多领域
          </p>
        </div>
        
        <div class="space-y-8">
          ${Object.values(businessData).map((data, index) => renderServiceCard(data, index)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAdvantages(): string {
  return `
    <section id="advantages" class="py-24 relative bg-gradient-to-b from-transparent via-yellow-900/10 to-transparent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-yellow-500 font-medium mb-4 block">为什么选择我们</span>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
            核心优势
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          ${advantages.map((adv, i) => `
            <div class="glass rounded-2xl p-6 text-center card-hover" style="animation-delay: ${i * 0.1}s;">
              <div class="w-12 h-12 rounded-full bg-yellow-600/20 mx-auto mb-4 flex items-center justify-center" style="color: #FFD700;">
                ${icons.star}
              </div>
              <p class="text-white font-medium">${adv}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="glass rounded-3xl p-8 md:p-12 animate-pulse-glow">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="lg:w-1/3 text-center">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-500 mx-auto flex items-center justify-center mb-6" style="color: #050D18;">
                ${icons.dollar}
              </div>
              <h3 class="text-2xl font-bold text-white">资金安全有保障</h3>
            </div>
            <div class="lg:w-2/3">
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.shield}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">资金监管</h4>
                    <p class="text-sm text-gray-400">所有资金通过正规渠道托管，安全透明</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.clock}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">快速到账</h4>
                    <p class="text-sm text-gray-400">简化流程，最快当天完成资金到位</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.trending}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">优惠费率</h4>
                    <p class="text-sm text-gray-400">行业竞争力费率，降低融资成本</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.users}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">专属服务</h4>
                    <p class="text-sm text-gray-400">一对一专业顾问，全程跟踪服务</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAgent(): string {
  return `
    <section id="agent" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl"></div>
          
          <div class="relative z-10">
            <div class="text-center mb-12">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/30 mb-6">
                ${icons.users}
                <span class="text-yellow-500 font-medium">诚邀加盟</span>
              </div>
              <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
                诚邀有企业资源代理
              </h2>
              <p class="text-gray-400 max-w-2xl mx-auto">
                如果您有企业客户资源，欢迎加入我们的代理体系，共同开拓市场，实现互利共赢
              </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              ${agentBenefits.map((benefit, i) => `
                <div class="bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-700/50 hover:border-yellow-600/30 transition-all" style="animation-delay: ${i * 0.1}s;">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-yellow-600/10 mx-auto mb-4 flex items-center justify-center" style="color: #FFD700;">
                    ${benefit.icon}
                  </div>
                  <h4 class="text-lg font-bold text-white mb-2">${benefit.title}</h4>
                  <p class="text-sm text-gray-400">${benefit.desc}</p>
                </div>
              `).join('')}
            </div>
            
            <div class="text-center">
              <a href="#contact" class="btn-gold text-lg px-12 py-4 inline-flex items-center gap-2">
                成为代理伙伴
                <span>${icons.arrow}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContact(): string {
  return `
    <section id="contact" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-yellow-500 font-medium mb-4 block">联系我们</span>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
            立即咨询
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            专业顾问随时为您服务，欢迎来电咨询或留言
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Contact Info -->
          <div class="glass rounded-3xl p-8 md:p-10">
            <h3 class="text-2xl font-bold text-white mb-8">联系方式</h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                  ${icons.phone}
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-1">联系电话</p>
                  <p class="text-white text-lg font-medium">400-888-8888</p>
                  <p class="text-gray-400 text-sm">7×24小时恭候您的来电</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                  ${icons.mail}
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-1">电子邮箱</p>
                  <p class="text-white text-lg font-medium">contact@dingfong.com</p>
                  <p class="text-gray-400 text-sm">工作时间：9:00 - 18:00</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-1">公司地址</p>
                  <p class="text-white text-lg font-medium">北京市朝阳区建国门外大街1号</p>
                  <p class="text-gray-400 text-sm">国贸CBD核心区</p>
                </div>
              </div>
            </div>
            
            <div class="mt-10 pt-8 border-t border-slate-700/50">
              <p class="text-gray-400 text-sm mb-4">商务合作</p>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-600/20 transition-colors" style="color: #FFD700;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89a5.718 5.718 0 0 0-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-600/20 transition-colors" style="color: #FFD700;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="bg-slate-800/50 rounded-3xl p-8 md:p-10 border border-slate-700/50">
            <h3 class="text-2xl font-bold text-white mb-8">在线留言</h3>
            
            <form id="contact-form" class="space-y-6">
              <div>
                <label class="block text-sm text-gray-400 mb-2">您的姓名</label>
                <input type="text" name="name" placeholder="请输入您的姓名" required class="w-full">
              </div>
              
              <div>
                <label class="block text-sm text-gray-400 mb-2">联系电话</label>
                <input type="tel" name="phone" placeholder="请输入您的手机号" required class="w-full">
              </div>
              
              <div>
                <label class="block text-sm text-gray-400 mb-2">咨询业务</label>
                <select name="service" class="w-full" style="background: rgba(26, 42, 74, 0.5); border: 1px solid rgba(184, 134, 11, 0.3); color: var(--text-light); padding: 12px 16px; border-radius: 8px;">
                  <option value="">请选择咨询业务</option>
                  <option value="listed">上市公司类</option>
                  <option value="enterprise">企业/个人摆账类</option>
                  <option value="bank">银行存款类</option>
                  <option value="ar">应收账款买断融资</option>
                  <option value="agent">代理合作</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm text-gray-400 mb-2">留言内容</label>
                <textarea name="message" rows="4" placeholder="请简要描述您的需求..." class="w-full resize-none"></textarea>
              </div>
              
              <button type="submit" class="btn-gold w-full text-lg py-4">
                提交咨询
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="py-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
              <span class="text-sm font-bold text-gray-900">DF</span>
            </div>
            <div>
              <h3 class="text-lg font-bold gradient-text">鼎丰资金</h3>
              <p class="text-xs text-gray-500">专业资金服务平台</p>
            </div>
          </div>
          
          <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#services" class="hover:text-yellow-500 transition-colors">业务服务</a>
            <a href="#advantages" class="hover:text-yellow-500 transition-colors">核心优势</a>
            <a href="#agent" class="hover:text-yellow-500 transition-colors">代理加盟</a>
            <a href="#contact" class="hover:text-yellow-500 transition-colors">联系我们</a>
          </div>
          
          <p class="text-sm text-gray-500">
            © ${year} 鼎丰资金. 保留所有权利.
          </p>
        </div>
        
        <div class="mt-8 pt-8 border-t border-slate-800/50 text-center">
          <p class="text-xs text-gray-600">
            温馨提示：本平台所有业务均在国家法律法规框架内开展，诚信经营，合规操作。
          </p>
        </div>
      </div>
    </footer>
  `;
}

// Main app initialization
export function initApp(): void {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  app.innerHTML = `
    ${renderNavbar()}
    ${renderHero()}
    ${renderServices()}
    ${renderAdvantages()}
    ${renderAgent()}
    ${renderContact()}
    ${renderFooter()}
  `;

  // Initialize mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Form submission handler
  const contactForm = document.getElementById('contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      
      // Show success message
      alert('感谢您的咨询！我们的专业顾问将在24小时内与您联系。');
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card-hover').forEach(el => {
    observer.observe(el);
  });
}
