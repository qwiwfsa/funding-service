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
  article: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  tag: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
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

// Article data
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  views: number;
  author: string;
  cover: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: '上市公司短拆业务详解：快速解决资金周转难题',
    excerpt: '上市公司短拆是指为上市公司提供的短期资金拆借服务，主要用于解决企业在日常经营中的短期资金缺口。',
    content: `上市公司短拆是指为上市公司提供的短期资金拆借服务，主要用于解决企业在日常经营中的短期资金缺口。

**业务特点：**

1. **额度灵活**：根据企业实际需求，灵活调配资金额度，从数千万到数亿元均可操作。

2. **放款快速**：材料齐全情况下，最快48小时内完成放款，解决企业燃眉之急。

3. **期限短**：一般为1-6个月，满足企业短期资金周转需求。

4. **用途广泛**：可用于补充流动资金、偿还到期债务、采购原材料等多种用途。

**适用场景：**

- 季末、年末银行信贷续贷前的过渡资金
- 重大合同履约前的保证金需求
- 并购重组过程中的过桥资金需求
- 日常经营中的季节性资金缺口

**合作流程：**

1. 需求沟通与材料提交
2. 风控审核与额度审批
3. 合同签订与手续办理
4. 资金放款与使用
5. 到期还款与后续服务

我们拥有丰富的上市公司短拆经验，已成功为数百家上市公司提供专业服务，是您值得信赖的资金合作伙伴。`,
    category: '上市公司服务',
    date: '2024-01-15',
    views: 2580,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: '云信票据实摆：企业资金实力展示的新选择',
    excerpt: '云信票据实摆是一种创新的资金证明方式，通过云信平台出具真实有效的票据，为企业展示资金实力。',
    content: `云信票据实摆是一种创新的资金证明方式，通过云信平台出具真实有效的票据，为企业展示资金实力。

**什么是云信票据：**

云信是由大型企业或金融机构发行的电子付款承诺函，可以在平台上进行拆分、流转、持有到期等多种操作。

**实摆服务优势：**

1. **真实性强**：云信票据可在官网查验，确保真实有效
2. **灵活性高**：票据可拆分，满足不同金额需求
3. **流通性好**：可在云信平台进行转让、融资
4. **成本较低**：相比传统摆账，成本更加可控

**适用场景：**

- 参与大型项目招标
- 企业实力证明与宣传
- 供应链融资与结算
- 商业谈判中的信用背书

**操作流程：**

1. 提交企业资质材料
2. 评估可开立额度
3. 签订服务协议
4. 开立云信票据
5. 票据交付与查验

选择云信票据实摆，让您的资金实力说话！`,
    category: '企业摆账',
    date: '2024-01-10',
    views: 1860,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: '银行冲量业务指南：如何选择靠谱服务商',
    excerpt: '银行冲量是银行揽储的重要方式，选择靠谱的服务商至关重要。本文教您如何辨别优质服务商。',
    content: `银行冲量是银行揽储的重要方式，选择靠谱的服务商至关重要。

**什么是银行冲量：**

银行冲量是指在月末、季末、年末等关键时点，将资金存入指定银行并承诺一定期限后取出，以帮助银行完成存款指标的业务。

**服务类型：**

1. **时点冲量**：仅要求在特定时点达到存款金额
2. **日均冲量**：要求在考核期内日均存款达到一定水平
3. **月底冲量**：专门针对月末存款指标的冲量服务

**如何选择服务商：**

1. **资质审查**：确认服务商具有相关经营资质
2. **资金安全**：了解资金安全保障措施
3. **价格合理**：对比市场行情，选择合理报价
4. **口碑评价**：查看过往客户评价与合作案例
5. **合同规范**：签订正规合同，明确双方权利义务

**风险提示：**

- 警惕超低价诱惑，可能存在资金安全隐患
- 确认银行合作渠道是否正规
- 仔细阅读合同条款，避免隐性费用

我们拥有多年银行冲量服务经验，与多家银行建立稳定合作关系，值得您的信赖。`,
    category: '银行存款',
    date: '2024-01-05',
    views: 3240,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    title: '应收账款买断融资：盘活企业应收账款的利器',
    excerpt: '应收账款买断融资是一种高效的融资方式，可以帮助企业快速回笼资金，改善现金流状况。',
    content: `应收账款买断融资是一种高效的融资方式，可以帮助企业快速回笼资金，改善现金流状况。

**业务原理：**

企业将应收账款转让给资金方，资金方按照应收账款面值的一定比例提前支付现金，到期后由付款方直接还款给资金方。

**核心优势：**

1. **快速回款**：最快当天完成应收账款变现
2. **不看征信**：不要求买方或卖方提供征信报告
3. **门槛灵活**：不挑企业规模，只要有真实应收账款即可
4. **操作便捷**：材料简单，流程简化

**应用场景：**

- **收购矿产**：解决矿产资源收购中的资金缺口
- **替代保证金/保函**：用应收账款置换保证金或银行保函
- **清理三角债**：通过应收账款买断解决多方债务问题
- **平应收应付**：优化企业资产负债表
- **归还股东占款**：快速筹集资金归还关联方借款
- **增资产降负债**：优化财务结构，提升企业评级

**置换为云信票据：**

应收账款可等价置换为云信票据，票据可拆分、可流转、可支付、可融资贴现，一票多用，灵活便捷。

立即咨询，了解您的应收账款融资方案！`,
    category: '应收账款融资',
    date: '2024-01-01',
    views: 4120,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
  },
  {
    id: 5,
    title: '股票质押融资：上市公司股东融资新渠道',
    excerpt: '股票质押融资是上市公司股东以所持股票作为质押物获取资金的方式，是常见的股权融资手段。',
    content: `股票质押融资是上市公司股东以所持股票作为质押物获取资金的方式，是常见的股权融资手段。

**业务模式：**

1. **质押式回购**：将股票质押给资金方，获得资金，约定未来回购股票
2. **质押式转让**：将股票转让给资金方，获得资金，约定未来购回
3. **场外质押**：在交易所以外进行的股票质押融资

**准入条件：**

- 上市公司股票（主板、中小板、创业板、科创板均可）
- 股票有一定流动性
- 股东无重大违规记录
- 质押比例符合监管要求

**融资要素：**

- **额度**：根据股票市值及质押率确定，一般为市值的30%-60%
- **期限**：1个月至3年不等，可灵活选择
- **利率**：年化利率根据市场情况而定
- **用途**：无严格限制，可用于企业经营、投资、减持税筹等

**服务流程：**

1. 提交股票及股东材料
2. 评估可融资额度
3. 签订质押合同
4. 办理质押登记
5. 资金放款

我们提供专业的股票质押融资服务，助力股东盘活股权价值！`,
    category: '上市公司服务',
    date: '2023-12-28',
    views: 1980,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
  },
  {
    id: 6,
    title: '企业实缴验资：注册资本金的正确打开方式',
    excerpt: '实缴验资是企业发展过程中的重要环节，本文详细介绍实缴验资的流程、注意事项及常见问题。',
    content: `实缴验资是企业发展过程中的重要环节，本文详细介绍实缴验资的流程、注意事项及常见问题。

**什么是实缴验资：**

实缴验资是指企业股东按照公司章程约定的注册资本金额度，将资金实际存入公司账户，并由会计师事务所出具验资报告的过程。

**为什么要实缴验资：**

- 响应国家注册资本实缴制要求
- 提升企业信用和公信力
- 参与招投标项目的资质要求
- 申请金融牌照的必要条件
- 吸引投资和合作伙伴

**验资流程：**

1. 开设企业验资账户
2. 股东按比例缴付出资
3. 取得银行入账凭证
4. 委托会计师事务所审计
5. 出具验资报告
6. 工商变更登记

**注意事项：**

- 确保资金来源合法合规
- 出资方式需符合公司章程
- 注意出资时间节点
- 保留完整的出资凭证
- 选择有资质的会计师事务所

**我们的服务：**

- 全程指导验资流程
- 协助准备工商材料
- 快速出具验资报告
- 提供资金过桥（如需）

选择专业团队，让验资更简单！`,
    category: '企业摆账',
    date: '2023-12-20',
    views: 2150,
    author: '鼎丰资金研究院',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  },
];

const categories = ['全部', '上市公司服务', '企业摆账', '银行存款', '应收账款融资'];

// Render functions
declare global {
  interface Window {
    showModal135: () => void;
  }
}
function renderNavbar(): string {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm" style="border-bottom: 1px solid rgba(184, 134, 11, 0.1);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
              <span class="text-xl font-bold text-white">DF</span>
            </div>
            <div>
              <h1 class="text-xl font-bold" style="color: #B8860B;">鼎丰资金</h1>
              <p class="text-xs" style="color: #6B7280;">专业资金服务平台</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center gap-8">
            <a href="#" data-page="home" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">首页</a>
            <a href="#" data-page="services" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">业务范围</a>
            <a href="#" data-page="advantages" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">核心优势</a>
            <a href="#" data-page="agent" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">代理加盟</a>
            <a href="#" data-page="articles" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">文章资讯</a>
            <a href="#" data-page="contact" class="nav-link text-gray-700 hover:text-yellow-600 transition-colors">联系我们</a>
          </div>
          
          <button class="btn-gold hidden md:block" onclick="window.showModal135(); return false;">
            立即咨询
          </button>
          
          <button class="md:hidden text-gray-700" id="mobile-menu-btn">
            ${icons.menu}
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div class="hidden md:hidden bg-white border-t border-gray-100" id="mobile-menu">
        <div class="px-4 py-4 space-y-3">
          <a href="#" data-page="home" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">首页</a>
          <a href="#" data-page="services" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">业务范围</a>
          <a href="#" data-page="advantages" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">核心优势</a>
          <a href="#" data-page="agent" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">代理加盟</a>
          <a href="#" data-page="articles" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">文章资讯</a>
          <a href="#" data-page="contact" class="nav-link block text-gray-700 hover:text-yellow-600 py-2">联系我们</a>
          <button class="btn-gold w-full mt-4" onclick="window.showModal135(); return false;">立即咨询</button>
        </div>
      </div>
    </nav>
  `;
}

function renderHero(): string {
  return `
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style="background: linear-gradient(180deg, #ffffff 0%, #F8FAFC 100%);">
      <!-- Background decorations -->
      <div class="decorative-circle w-96 h-96 -top-20 -left-20" style="background: radial-gradient(circle, rgba(184, 134, 11, 0.08) 0%, transparent 70%);"></div>
      <div class="decorative-circle w-80 h-80 bottom-20 -right-20" style="background: radial-gradient(circle, rgba(218, 165, 32, 0.06) 0%, transparent 70%);"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/20 mb-8">
            <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span class="text-yellow-600 text-sm font-medium">专业 · 诚信 · 高效 · 共赢</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span class="gradient-text">鼎丰资金</span>
            <br>
            <span style="color: #1F2937;">专业资金服务平台</span>
          </h1>
          
          <p class="text-lg md:text-xl mb-10 leading-relaxed" style="color: #6B7280;">
            专注上市公司短拆、过桥、摆账、存款、应收账款融资等全方位资金解决方案
            <br>
            <span class="font-medium" style="color: #B8860B;">资金实力雄厚 | 服务全国 | 合作共赢</span>
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" class="btn-gold text-lg px-10 py-4">
              了解更多服务
              <span class="ml-2 inline-block">${icons.arrow}</span>
            </a>
            <a href="javascript:void(0)" onclick="window.showModal135(); return false;" class="btn-outline text-lg px-10 py-4">
              立即咨询
            </a>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up" style="animation-delay: 0.3s;">
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg card-hover" style="border: 1px solid rgba(184, 134, 11, 0.1);">
            <div class="stat-value">500+</div>
            <p class="mt-2" style="color: #6B7280;">成功案例</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg card-hover" style="border: 1px solid rgba(184, 134, 11, 0.1);">
            <div class="stat-value">50亿+</div>
            <p class="mt-2" style="color: #6B7280;">累计交易额</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg card-hover" style="border: 1px solid rgba(184, 134, 11, 0.1);">
            <div class="stat-value">98%</div>
            <p class="mt-2" style="color: #6B7280;">客户满意度</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg card-hover" style="border: 1px solid rgba(184, 134, 11, 0.1);">
            <div class="stat-value">24h</div>
            <p class="mt-2" style="color: #6B7280;">快速响应</p>
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

function renderServiceCard(data: typeof businessData.listed & { scenarios?: string[] }, index: number): string {
  return `
    <div class="rounded-3xl p-8 md:p-10 card-hover" style="background: #ffffff; border: 1px solid rgba(184, 134, 11, 0.15); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);" style="animation-delay: ${index * 0.1}s;">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-1/3">
          <div class="icon-box mb-6" style="color: ${data.color};">
            ${data.icon}
          </div>
          <h3 class="text-2xl font-bold mb-2" style="color: #1F2937;">${data.title}</h3>
          <p class="text-sm mb-6" style="color: ${data.color};">${data.subtitle}</p>
          ${data.scenarios ? `
            <div class="rounded-xl p-4" style="background: #F8FAFC;">
              <p class="text-sm mb-3" style="color: #6B7280;">应用场景：</p>
              <div class="flex flex-wrap gap-2">
                ${data.scenarios.map(s => `<span class="px-3 py-1 rounded-full text-xs bg-yellow-600/10 text-yellow-600 border border-yellow-600/20">${s}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="lg:w-2/3 grid sm:grid-cols-2 gap-4">
          ${data.services.map(service => `
            <div class="rounded-xl p-5 transition-all" style="background: #F8FAFC; border: 1px solid rgba(184, 134, 11, 0.1);">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-yellow-600/10 flex items-center justify-center flex-shrink-0 mt-0.5" style="color: ${data.color};">
                  ${icons.check}
                </div>
                <div>
                  <h4 class="font-semibold mb-1" style="color: #1F2937;">${service.name}</h4>
                  <p class="text-sm" style="color: #6B7280;">${service.desc}</p>
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
  // 案例图片数据（8个）
  const caseImages = [
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_ec5f19a9-bbf1-4d7b-980e-cd8929d436ba.jpeg?sign=1808917820-e84aa2e065-0-f1db7189951cc64ca3dcddb327d2c350c0e5871cb720a0d20b070fd0c99124e5',
      title: '上市公司短拆业务',
      desc: '为上市公司提供短期拆借服务，快速解决资金周转需求'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_514696d5-9d87-471c-bfc7-7921255ed88e.jpeg?sign=1808917819-af1217cad5-0-76d1bab2d9dbfca22753f0ca1ec0e475af6d7745d0f3830366877fc727bca079',
      title: '企业摆账验资',
      desc: '专业企业摆账服务，助您完成实缴验资与资金证明'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_4b13c86c-f4c4-458e-a952-3bf9e3ddb51a.jpeg?sign=1808917817-e921d570cc-0-6d35cfd2492ebb2e58b3b29c1228e8295449fa6ee5995874642360a2dec28383',
      title: '银行存款冲量',
      desc: '银行时点、日均、月底冲量，一年期/三年期定期存款'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_a8176964-74f6-4c40-96de-aff36964eb1a.jpeg?sign=1808917825-064d04ccaf-0-7168882115b63ec8b086963b1e72868527c1bf4f488d858be6c51b21305d25c5',
      title: '应收账款融资',
      desc: '云信票据置换，快速变现，加速企业资金周转'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_834df348-bf9e-44df-baaf-25a354b0327d.jpeg?sign=1808918005-9e5813ebd3-0-db76c5b16e121104f3fea593701bf5cf8b3c699b71700d3bdaf68d4261100b02',
      title: '股票质押融资',
      desc: '股票质押、定增、协议转让，专业法律合规服务'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_9aadb54b-cf78-4093-ba57-7b96145cb044.jpeg?sign=1808918022-a2ca12e87d-0-1dbc95c45107926d65d2aaaaa28b9a98c325aa74b4cd9d337bbf16e21b22a154',
      title: '募集账户归还',
      desc: '募集账户归还过桥，产业基金备案过桥服务'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_ffda8da3-5372-49d7-856b-f2ff4a7b7e6c.jpeg?sign=1808918020-f08e65046e-0-a53aa940ac3d94132e8efd69e5df223e571f5e8c2d277d5376c3940f01ff3b93',
      title: '云信票据实摆',
      desc: '云信票据实摆服务，可拆分流转，替代现金支付'
    },
    {
      image: 'https://coze-coding-project.tos.coze.site/coze_storage_7633780595134529586/image/generate_image_a58d4ef9-d2e9-4112-81de-0d253c2e9294.jpeg?sign=1808918005-48e418dba9-0-b36162129ecfde4a7b5f742e06e03ed99e0288e0b5b3b04a2e75db417308142c',
      title: '资金证明服务',
      desc: '银行保函、资金证明、显账亮资，一站式金融服务'
    }
  ];

  return `
    <section id="services" class="py-24 relative" style="background: #ffffff;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="font-medium mb-4 block" style="color: #B8860B;">我们的服务</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6" style="color: #1F2937;">
            全方位资金解决方案
          </h2>
          <p class="mb-6" style="color: #6B7280;">
            专业团队提供一站式资金服务，覆盖上市公司、企业个人、银行存款及应收账款融资等多领域
          </p>
        </div>
        
        <!-- 案例图片卡片 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          ${caseImages.map((item, index) => `
            <div class="group rounded-2xl overflow-hidden card-hover bg-white" style="border: 1px solid rgba(184, 134, 11, 0.1); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); animation-delay: ${index * 0.1}s;">
              <div class="aspect-[4/3] overflow-hidden">
                <img 
                  src="${item.image}" 
                  alt="${item.title}"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div class="p-5">
                <h3 class="font-bold text-lg mb-2" style="color: #1F2937;">${item.title}</h3>
                <p class="text-sm leading-relaxed" style="color: #6B7280;">${item.desc}</p>
              </div>
            </div>
          `).join('')}
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
    <section id="advantages" class="py-24 relative" style="background: linear-gradient(180deg, #F8FAFC 0%, #ffffff 100%);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="font-medium mb-4 block" style="color: #B8860B;">为什么选择我们</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6" style="color: #1F2937;">
            核心优势
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          ${advantages.map((adv, i) => `
            <div class="rounded-2xl p-6 text-center card-hover bg-white" style="border: 1px solid rgba(184, 134, 11, 0.1); box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);" style="animation-delay: ${i * 0.1}s;">
              <div class="w-12 h-12 rounded-full bg-yellow-600/10 mx-auto mb-4 flex items-center justify-center" style="color: #B8860B;">
                ${icons.star}
              </div>
              <p class="font-medium" style="color: #1F2937;">${adv}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="rounded-3xl p-8 md:p-12 animate-pulse-glow" style="background: linear-gradient(135deg, #1E3A5F 0%, #2D5A87 100%);">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="lg:w-1/3 text-center">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 mx-auto flex items-center justify-center mb-6">
                ${icons.dollar}
              </div>
              <h3 class="text-2xl font-bold text-white">资金安全有保障</h3>
            </div>
            <div class="lg:w-2/3">
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.shield}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">资金监管</h4>
                    <p class="text-sm" style="color: rgba(255,255,255,0.7);">所有资金通过正规渠道托管，安全透明</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.clock}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">快速到账</h4>
                    <p class="text-sm" style="color: rgba(255,255,255,0.7);">简化流程，最快当天完成资金到位</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.trending}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">优惠费率</h4>
                    <p class="text-sm" style="color: rgba(255,255,255,0.7);">行业竞争力费率，降低融资成本</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0" style="color: #FFD700;">
                    ${icons.users}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">专属服务</h4>
                    <p class="text-sm" style="color: rgba(255,255,255,0.7);">一对一专业顾问，全程跟踪服务</p>
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
    <section id="agent" class="py-24 relative" style="background: #ffffff;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl p-8 md:p-16 relative overflow-hidden" style="background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%); border: 1px solid rgba(184, 134, 11, 0.2);">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl"></div>
          
          <div class="relative z-10">
            <div class="text-center mb-12">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/30 mb-6">
                ${icons.users}
                <span class="font-medium" style="color: #B8860B;">诚邀加盟</span>
              </div>
              <h2 class="text-3xl md:text-5xl font-bold mb-6" style="color: #1F2937;">
                诚邀有企业资源代理
              </h2>
              <p class="mb-6" style="color: #6B7280;">
                如果您有企业客户资源，欢迎加入我们的代理体系，共同开拓市场，实现互利共赢
              </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              ${agentBenefits.map((benefit, i) => `
                <div class="rounded-2xl p-6 text-center bg-white border border-yellow-600/10 card-hover" style="animation-delay: ${i * 0.1}s;">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-600/10 to-yellow-600/5 mx-auto mb-4 flex items-center justify-center" style="color: #B8860B;">
                    ${benefit.icon}
                  </div>
                  <h4 class="text-lg font-bold mb-2" style="color: #1F2937;">${benefit.title}</h4>
                  <p class="text-sm" style="color: #6B7280;">${benefit.desc}</p>
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
    <section id="contact" class="py-24 relative" style="background: #F8FAFC;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="font-medium mb-4 block" style="color: #B8860B;">联系我们</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6" style="color: #1F2937;">
            立即咨询
          </h2>
          <p class="mb-6" style="color: #6B7280;">
            专业顾问随时为您服务，欢迎来电咨询或留言
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Contact Info -->
          <div class="rounded-3xl p-8 md:p-10 bg-white" style="box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); border: 1px solid rgba(184, 134, 11, 0.1);">
            <h3 class="text-2xl font-bold mb-8" style="color: #1F2937;">联系方式</h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/10 flex items-center justify-center flex-shrink-0" style="color: #B8860B;">
                  ${icons.phone}
                </div>
                <div>
                  <p class="text-sm mb-1" style="color: #6B7280;">联系电话</p>
                  <p class="text-lg font-medium" style="color: #1F2937;">135-5288-3008</p>
                  <p class="text-sm" style="color: #6B7280;">7×24小时恭候您的来电</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/10 flex items-center justify-center flex-shrink-0" style="color: #B8860B;">
                  ${icons.mail}
                </div>
                <div>
                  <p class="text-sm mb-1" style="color: #6B7280;">电子邮箱</p>
                  <p class="text-lg font-medium" style="color: #1F2937;">wanglizhongguo@126.com</p>
                  <p class="text-sm" style="color: #6B7280;">工作时间：9:00 - 18:00</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-600/10 flex items-center justify-center flex-shrink-0" style="color: #B8860B;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p class="text-sm mb-1" style="color: #6B7280;">公司地址</p>
                  <p class="text-lg font-medium" style="color: #1F2937;">北京市朝阳区建国门外大街1号</p>
                  <p class="text-sm" style="color: #6B7280;">国贸CBD核心区</p>
                </div>
              </div>
            </div>
            
            <div class="mt-10 pt-8" style="border-top: 1px solid rgba(184, 134, 11, 0.1);">
              <p class="text-sm mb-4" style="color: #6B7280;">商务合作</p>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-yellow-600/10 transition-colors" style="color: #B8860B;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89a5.718 5.718 0 0 0-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-yellow-600/10 transition-colors" style="color: #B8860B;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="rounded-3xl p-8 md:p-10 bg-white" style="box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); border: 1px solid rgba(184, 134, 11, 0.1);">
            <h3 class="text-2xl font-bold mb-8" style="color: #1F2937;">在线留言</h3>
            
            <form id="contact-form" class="space-y-6">
              <div>
                <label class="block text-sm mb-2" style="color: #6B7280;">您的姓名</label>
                <input type="text" name="name" placeholder="请输入您的姓名" required class="w-full">
              </div>
              
              <div>
                <label class="block text-sm mb-2" style="color: #6B7280;">联系电话</label>
                <input type="tel" name="phone" placeholder="请输入您的手机号" required class="w-full">
              </div>
              
              <div>
                <label class="block text-sm mb-2" style="color: #6B7280;">咨询业务</label>
                <select name="service" class="w-full" style="background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(184, 134, 11, 0.3); color: #1F2937; padding: 12px 16px; border-radius: 8px;">
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
                <label class="block text-sm mb-2" style="color: #6B7280;">留言内容</label>
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

function renderArticles(): string {
  return `
    <section id="articles" class="py-24 relative" style="background: #ffffff;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="font-medium mb-4 block" style="color: #B8860B;">知识中心</span>
          <h2 class="text-3xl md:text-5xl font-bold mb-6" style="color: #1F2937;">
            文章资讯
          </h2>
          <p class="mb-8" style="color: #6B7280;">
            专业解读资金业务知识，助您更好地了解行业动态
          </p>
          
          <!-- Category Filter -->
          <div class="flex flex-wrap justify-center gap-3" id="article-filters">
            ${categories.map((cat, i) => `
              <button 
                class="article-filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-yellow-600 hover:text-white'}"
                data-category="${cat}"
              >
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Articles Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="articles-grid">
          ${articles.map((article, i) => `
            <article 
              class="article-card rounded-2xl overflow-hidden card-hover bg-white cursor-pointer" 
              style="border: 1px solid rgba(184, 134, 11, 0.1); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);"
              data-id="${article.id}"
              data-category="${article.category}"
            >
              <div class="relative" style="height: 200px; overflow: hidden;">
                <img 
                  src="${article.cover}" 
                  alt="${article.title}" 
                  class="w-full h-full object-cover"
                  style="transition: transform 0.3s ease;"
                  onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'"
                >
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" style="background: rgba(184, 134, 11, 0.9); color: white;">
                    ${article.category}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold mb-3 line-clamp-2 hover:text-yellow-600 transition-colors" style="color: #1F2937;">
                  ${article.title}
                </h3>
                <p class="text-sm mb-4 line-clamp-2" style="color: #6B7280;">
                  ${article.excerpt}
                </p>
                <div class="flex items-center justify-between text-xs" style="color: #9CA3AF;">
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      ${icons.calendar}
                      ${article.date}
                    </span>
                    <span class="flex items-center gap-1">
                      ${icons.eye}
                      ${article.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
    
    <!-- Article Detail Modal -->
    <div id="article-modal" class="fixed inset-0 z-[100] hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="modal-overlay"></div>
      <div class="relative h-full overflow-y-auto">
        <div class="min-h-full flex items-start justify-center py-8 px-4">
          <div class="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl" style="margin-top: 60px;">
            <button id="close-modal" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10" style="color: #6B7280;">
              ${icons.close}
            </button>
            <div id="modal-content" class="p-8 md:p-12">
              <!-- Content will be injected by JS -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFooter(): string {
  const year = new Date().getFullYear();
  return `
    <footer class="py-12" style="background: #1F2937; border-top: 1px solid rgba(184, 134, 11, 0.1);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
              <span class="text-sm font-bold text-white">DF</span>
            </div>
            <div>
              <h3 class="text-lg font-bold" style="color: #FFD700;">鼎丰资金</h3>
              <p class="text-xs" style="color: rgba(255,255,255,0.5);">专业资金服务平台</p>
            </div>
          </div>
          
          <div class="flex flex-wrap justify-center gap-6 text-sm" style="color: rgba(255,255,255,0.6);">
            <a href="#home" class="hover:text-yellow-500 transition-colors">首页</a>
            <a href="#services" class="hover:text-yellow-500 transition-colors">业务范围</a>
            <a href="#advantages" class="hover:text-yellow-500 transition-colors">核心优势</a>
            <a href="#agent" class="hover:text-yellow-500 transition-colors">代理加盟</a>
            <a href="#articles" class="hover:text-yellow-500 transition-colors">文章资讯</a>
            <a href="#contact" class="hover:text-yellow-500 transition-colors">联系我们</a>
          </div>
          
          <p class="text-sm" style="color: rgba(255,255,255,0.4);">
            © ${year} 鼎丰资金. 保留所有权利.
          </p>
        </div>
        
        <div class="mt-8 pt-8" style="border-top: 1px solid rgba(255,255,255,0.1);">
          <p class="text-xs text-center" style="color: rgba(255,255,255,0.3);">
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
    <div id="page-home" class="page-section">${renderHero()}</div>
    <div id="page-services" class="page-section">${renderServices()}</div>
    <div id="page-advantages" class="page-section">${renderAdvantages()}</div>
    <div id="page-agent" class="page-section">${renderAgent()}</div>
    <div id="page-articles" class="page-section">${renderArticles()}</div>
    <div id="page-contact" class="page-section">${renderContact()}</div>
    ${renderFooter()}
  `;
  
	  // Navigation logic
	  function navigateTo(page: string) {
	    const sections = document.querySelectorAll('.page-section');
	    
	    if (page === 'home') {
	      // 首页：显示全部页面
	      sections.forEach(section => section.classList.remove('hidden'));
	      window.scrollTo({ top: 0, behavior: 'smooth' });
	    } else {
	      // 其他页面：只显示对应页面，隐藏其他
	      sections.forEach(section => section.classList.add('hidden'));
	      const targetSection = document.getElementById(`page-${page}`);
	      if (targetSection) {
	        targetSection.classList.remove('hidden');
	        window.scrollTo({ top: 0, behavior: 'smooth' });
	      }
	    }
	    
	    // Close mobile menu
	    const mobileMenu = document.getElementById('mobile-menu');
	    if (mobileMenu) mobileMenu.classList.add('hidden');
	  }
  
  // Add click handlers to nav links
  document.querySelectorAll('nav a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = (link as HTMLElement).dataset.page || 'home';
      navigateTo(page);
    });
  });

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
            
      // Show success modal
      const modal = document.createElement('div');
      modal.id = 'success-modal';
      modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 40px; border-radius: 16px; max-width: 400px; width: 90%; text-align: center; animation: modalFadeIn 0.3s ease;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D4AF37, #C9A227); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg width="30" height="30" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            </div>
            <h3 style="font-size: 24px; font-weight: bold; color: #1a1a2e; margin-bottom: 20px;">感谢您的咨询！</h3>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <p style="margin: 8px 0; color: #666; font-size: 14px;">联系电话</p>
              <p style="margin: 0; font-size: 28px; font-weight: bold; color: #D4AF37;">135-5288-3008</p>
            </div>
            <div style="background: #f8f8f8; padding: 15px; border-radius: 12px; margin-bottom: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">电子邮箱</p>
              <p style="margin: 5px 0 0; font-size: 16px; color: #333;">wanglizhongguo@126.com</p>
            </div>
            <p style="color: #999; font-size: 14px; margin-bottom: 0;">我们的专业顾问将在24小时内与您联系</p>
            <button id="close-modal" style="margin-top: 20px; padding: 12px 40px; background: linear-gradient(135deg, #D4AF37, #C9A227); color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: transform 0.2s;">
              知道了
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      contactForm.reset();
      
      document.getElementById('close-modal')?.addEventListener('click', () => {
        modal.remove();
      });
      modal.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).tagName === 'DIV') modal.remove();
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: Event) => {
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      // Skip if href is just "#" or invalid
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
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

  // Article filtering
  const filterBtns = document.querySelectorAll('.article-filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('bg-yellow-600', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      btn.classList.remove('bg-gray-100', 'text-gray-600');
      btn.classList.add('bg-yellow-600', 'text-white');
      
      // Filter articles
      articleCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === '全部' || cardCategory === category) {
          (card as HTMLElement).style.display = 'block';
          card.classList.add('animate-fade-in-up');
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  });

  // Article modal
  const articleModal = document.getElementById('article-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');
  const modalOverlay = document.getElementById('modal-overlay');

  function openArticleModal(articleId: number): void {
    const article = articles.find(a => a.id === articleId);
    if (!article || !modalContent) return;

    const paragraphs = article.content.split('\n').map(p => {
      if (p.trim().startsWith('**') && p.trim().endsWith('**')) {
        return `<h3 class="text-xl font-bold mt-6 mb-3" style="color: #1F2937;">${p.replace(/\*\*/g, '')}</h3>`;
      } else if (p.trim().startsWith('-') || p.trim().startsWith('1.') || p.trim().startsWith('2.') || p.trim().startsWith('3.') || p.trim().startsWith('4.') || p.trim().startsWith('5.')) {
        return `<li class="ml-4 mb-2" style="color: #4B5563;">${p.trim().replace(/^[-*] /, '')}</li>`;
      } else if (p.trim() === '') {
        return '';
      } else {
        return `<p class="mb-4" style="color: #4B5563;">${p}</p>`;
      }
    }).join('');

    modalContent.innerHTML = `
      <div class="mb-6">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4" style="background: rgba(184, 134, 11, 0.1); color: #B8860B;">
          ${article.category}
        </span>
        <h2 class="text-2xl md:text-3xl font-bold mb-4" style="color: #1F2937;">${article.title}</h2>
        <div class="flex items-center gap-6 text-sm" style="color: #9CA3AF;">
          <span class="flex items-center gap-2">
            ${icons.calendar}
            ${article.date}
          </span>
          <span class="flex items-center gap-2">
            ${icons.eye}
            ${article.views.toLocaleString()} 阅读
          </span>
          <span class="flex items-center gap-2">
            ${icons.article}
            ${article.author}
          </span>
        </div>
      </div>
      <div class="prose max-w-none" style="line-height: 1.8;">
        ${paragraphs}
      </div>
      <div class="mt-8 pt-8" style="border-top: 1px solid rgba(184, 134, 11, 0.1);">
        <p class="text-sm" style="color: #6B7280;">
          声明：本文仅供参考，不构成投资建议。如有业务需求，请联系我们的专业顾问。
        </p>
        <a href="javascript:void(0)" class="btn-gold inline-flex items-center gap-2 mt-4" onclick="closeModal(); window.showModal135(); return false;">
          立即咨询
          ${icons.arrow}
        </a>
      </div>
    `;

    articleModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    articleModal?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Add click handlers to article cards
  articleCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id') || '0');
      openArticleModal(id);
    });
  });

  closeModalBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // Close modal on escape key
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  });
}

  // Show contact modal function
  window.showModal135 = function() {
    const existing = document.getElementById('contact-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:white;padding:50px 60px;border-radius:12px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.2);">
        <div style="font-size:16px;color:#666;margin-bottom:15px;">联系电话</div>
        <div style="font-size:42px;font-weight:bold;color:#D4AF37;letter-spacing:2px;">135-5288-3008</div>
        <button onclick="this.closest('#contact-modal').remove()" style="margin-top:30px;padding:12px 40px;background:#D4AF37;color:white;border:none;border-radius:6px;font-size:16px;cursor:pointer;">关闭</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'contact-modal') modal.remove();
    });
  }

  // Add click events to all "立即咨询" buttons
    const consultBtns = document.querySelectorAll('.btn-gold, button');
    consultBtns.forEach((btn: Element) => {
    const text = (btn as HTMLElement).textContent?.trim();
        if (text && text.trim() === '立即咨询') {
            btn.addEventListener('click', (e: Event) => {
                e.preventDefault();
        e.stopPropagation();
        window.showModal135();
      });
    }
  });
  