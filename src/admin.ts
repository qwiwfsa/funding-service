// 管理员相关功能
declare global {
  interface Window {
    adminLogout: () => void;
    openAdmin: () => void;
    closeAdmin: () => void;
    saveHeroContent: () => void;
    saveStatsContent: () => void;
    saveServicesContent: () => void;
    saveAdvantagesContent: () => void;
    saveContactContent: () => void;
    resetContent: () => void;
  }
}

// 管理员数据接口
interface AdminContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  stats: Array<{ value: string; label: string }>;
  services: Array<{ title: string; description: string; icon: string }>;
  advantages: Array<{ title: string; description: string; icon: string }>;
  contact: {
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
}

// 默认内容数据
const defaultAdminContent: AdminContent = {
  hero: {
    title: '鼎丰资金',
    subtitle: '专业金融资金服务平台',
    description: '为上市公司、企业及个人提供全方位的资金解决方案',
  },
  stats: [
    { value: '100+', label: '合作机构' },
    { value: '500亿+', label: '累计服务资金' },
    { value: '98%', label: '客户满意度' },
    { value: '10年+', label: '行业经验' },
  ],
  services: [
    {
      title: '上市公司类',
      description: '短拆过桥、股票质押、定增、协议转让等',
      icon: '🏢',
    },
    {
      title: '企业摆账',
      description: '定存摆账、验资、资金证明、银行保函',
      icon: '💼',
    },
    {
      title: '银行存款',
      description: '时点冲量、日均冲量、定期存款',
      icon: '🏦',
    },
    {
      title: '应收账款融资',
      description: '云信票据置换、融资贴现',
      icon: '💰',
    },
  ],
  advantages: [
    {
      title: '专业团队',
      description: '资深金融顾问团队，10年以上行业经验',
      icon: '👔',
    },
    {
      title: '高效审批',
      description: '最快当天放款，流程简洁高效',
      icon: '⚡',
    },
    {
      title: '安全可靠',
      description: '资金来源正规，全程合规操作',
      icon: '🔒',
    },
    {
      title: '保密性强',
      description: '客户信息安全，签订保密协议',
      icon: '🤝',
    },
  ],
  contact: {
    title: '联系我们',
    description: '专业团队为您服务，欢迎咨询',
    address: '北京市朝阳区金融街中心',
    phone: '400-888-8888',
    email: 'contact@dfzj.com',
  },
};

// 本地存储键名
const ADMIN_CONTENT_KEY = 'dfzj_admin_content';
const ADMIN_LOGGED_KEY = 'dfzj_admin_logged';

// 获取/设置内容
export function getAdminContent(): AdminContent {
  const stored = localStorage.getItem(ADMIN_CONTENT_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultAdminContent;
    }
  }
  return defaultAdminContent;
}

export function saveAdminContent(content: AdminContent): void {
  localStorage.setItem(ADMIN_CONTENT_KEY, JSON.stringify(content));
}

// 登录状态
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_LOGGED_KEY) === 'true';
}

export function setAdminLoggedIn(value: boolean): void {
  if (value) {
    localStorage.setItem(ADMIN_LOGGED_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_LOGGED_KEY);
  }
}

// 管理员登录页面
export function renderAdminLogin(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="admin-login-page">
      <div class="admin-login-card">
        <div class="login-header">
          <div class="login-icon">🔐</div>
          <h1>管理员登录</h1>
          <p>资金业务展示平台后台管理</p>
        </div>
        <form id="admin-login-form" class="login-form">
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" id="username" name="username" placeholder="请输入用户名" required>
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="password" id="password" name="password" placeholder="请输入密码" required>
          </div>
          <button type="submit" class="login-btn">登录</button>
        </form>
        <div class="login-hint">
          <p>默认账号：admin / admin123</p>
        </div>
        <button class="back-btn" onclick="window.closeAdmin()">返回首页</button>
      </div>
    </div>
  `;

  // 登录表单提交
  const form = document.getElementById('admin-login-form') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (username === 'admin' && password === 'admin123') {
      setAdminLoggedIn(true);
      renderAdminDashboard();
    } else {
      alert('用户名或密码错误');
    }
  });
}

// 管理员后台仪表盘
export function renderAdminDashboard(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const content = getAdminContent();

  app.innerHTML = `
    <div class="admin-dashboard">
      <div class="admin-header">
        <div class="admin-header-left">
          <h1>📊 内容管理后台</h1>
          <p>可视化编辑各页面内容</p>
        </div>
        <button class="admin-logout-btn" onclick="window.adminLogout()">退出登录</button>
      </div>
      
      <div class="admin-tabs">
        <button class="tab-btn active" data-tab="hero">首页 Hero</button>
        <button class="tab-btn" data-tab="stats">数据统计</button>
        <button class="tab-btn" data-tab="services">业务范围</button>
        <button class="tab-btn" data-tab="advantages">核心优势</button>
        <button class="tab-btn" data-tab="contact">联系我们</button>
      </div>
      
      <div class="admin-content">
        <!-- Hero 编辑区 -->
        <div class="tab-panel active" id="panel-hero">
          <div class="panel-header">
            <h2>首页 Hero 区域</h2>
            <button class="save-btn" onclick="window.saveHeroContent()">保存修改</button>
          </div>
          <div class="edit-form">
            <div class="form-group">
              <label>主标题</label>
              <input type="text" id="edit-hero-title" value="${content.hero.title}">
            </div>
            <div class="form-group">
              <label>副标题</label>
              <input type="text" id="edit-hero-subtitle" value="${content.hero.subtitle}">
            </div>
            <div class="form-group">
              <label>描述文字</label>
              <textarea id="edit-hero-description">${content.hero.description}</textarea>
            </div>
          </div>
        </div>
        
        <!-- 统计数据编辑区 -->
        <div class="tab-panel" id="panel-stats">
          <div class="panel-header">
            <h2>数据统计区域</h2>
            <button class="save-btn" onclick="window.saveStatsContent()">保存修改</button>
          </div>
          <div class="edit-form" id="stats-editor">
            ${content.stats.map((stat, index) => `
              <div class="stat-item-edit">
                <div class="form-group">
                  <label>数值 ${index + 1}</label>
                  <input type="text" data-index="${index}" data-field="value" value="${stat.value}">
                </div>
                <div class="form-group">
                  <label>标签 ${index + 1}</label>
                  <input type="text" data-index="${index}" data-field="label" value="${stat.label}">
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- 业务范围编辑区 -->
        <div class="tab-panel" id="panel-services">
          <div class="panel-header">
            <h2>业务范围区域</h2>
            <button class="save-btn" onclick="window.saveServicesContent()">保存修改</button>
          </div>
          <div class="edit-form" id="services-editor">
            ${content.services.map((service, index) => `
              <div class="service-item-edit">
                <div class="form-group">
                  <label>图标 ${index + 1} (emoji)</label>
                  <input type="text" data-index="${index}" data-field="icon" value="${service.icon}">
                </div>
                <div class="form-group">
                  <label>标题 ${index + 1}</label>
                  <input type="text" data-index="${index}" data-field="title" value="${service.title}">
                </div>
                <div class="form-group">
                  <label>描述 ${index + 1}</label>
                  <textarea data-index="${index}" data-field="description">${service.description}</textarea>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- 核心优势编辑区 -->
        <div class="tab-panel" id="panel-advantages">
          <div class="panel-header">
            <h2>核心优势区域</h2>
            <button class="save-btn" onclick="window.saveAdvantagesContent()">保存修改</button>
          </div>
          <div class="edit-form" id="advantages-editor">
            ${content.advantages.map((adv, index) => `
              <div class="adv-item-edit">
                <div class="form-group">
                  <label>图标 ${index + 1} (emoji)</label>
                  <input type="text" data-index="${index}" data-field="icon" value="${adv.icon}">
                </div>
                <div class="form-group">
                  <label>标题 ${index + 1}</label>
                  <input type="text" data-index="${index}" data-field="title" value="${adv.title}">
                </div>
                <div class="form-group">
                  <label>描述 ${index + 1}</label>
                  <textarea data-index="${index}" data-field="description">${adv.description}</textarea>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- 联系我们编辑区 -->
        <div class="tab-panel" id="panel-contact">
          <div class="panel-header">
            <h2>联系我们区域</h2>
            <button class="save-btn" onclick="window.saveContactContent()">保存修改</button>
          </div>
          <div class="edit-form">
            <div class="form-group">
              <label>标题</label>
              <input type="text" id="edit-contact-title" value="${content.contact.title}">
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea id="edit-contact-description">${content.contact.description}</textarea>
            </div>
            <div class="form-group">
              <label>地址</label>
              <input type="text" id="edit-contact-address" value="${content.contact.address}">
            </div>
            <div class="form-group">
              <label>电话</label>
              <input type="text" id="edit-contact-phone" value="${content.contact.phone}">
            </div>
            <div class="form-group">
              <label>邮箱</label>
              <input type="text" id="edit-contact-email" value="${content.contact.email}">
            </div>
          </div>
        </div>
      </div>
      
      <div class="admin-footer">
        <button class="back-btn" onclick="window.closeAdmin()">返回首页</button>
        <button class="reset-btn" onclick="if(confirm('确定重置所有内容为默认值？')) window.resetContent()">重置为默认</button>
      </div>
    </div>
  `;

  // Tab 切换
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`panel-${tab}`)?.classList.add('active');
    });
  });
}

// 保存 Hero 内容
(window as any).saveHeroContent = function (): void {
  const content = getAdminContent();
  content.hero = {
    title: (document.getElementById('edit-hero-title') as HTMLInputElement).value,
    subtitle: (document.getElementById('edit-hero-subtitle') as HTMLInputElement).value,
    description: (document.getElementById('edit-hero-description') as HTMLTextAreaElement).value,
  };
  saveAdminContent(content);
  alert('保存成功！');
};

// 保存统计数据
(window as any).saveStatsContent = function (): void {
  const content = getAdminContent();
  const inputs = document.querySelectorAll('#stats-editor input');
  inputs.forEach((input) => {
    const index = parseInt(input.getAttribute('data-index') || '0');
    const field = input.getAttribute('data-field') as 'value' | 'label';
    if (content.stats[index]) {
      content.stats[index][field] = (input as HTMLInputElement).value;
    }
  });
  saveAdminContent(content);
  alert('保存成功！');
};

// 保存业务范围
(window as any).saveServicesContent = function (): void {
  const content = getAdminContent();
  document.querySelectorAll('#services-editor [data-index]').forEach((el) => {
    const index = parseInt(el.getAttribute('data-index') || '0');
    const field = el.getAttribute('data-field') as 'icon' | 'title' | 'description';
    if (content.services[index]) {
      if (field === 'description') {
        content.services[index][field] = (el as HTMLTextAreaElement).value;
      } else {
        content.services[index][field] = (el as HTMLInputElement).value;
      }
    }
  });
  saveAdminContent(content);
  alert('保存成功！');
};

// 保存核心优势
(window as any).saveAdvantagesContent = function (): void {
  const content = getAdminContent();
  document.querySelectorAll('#advantages-editor [data-index]').forEach((el: Element) => {
    const index = parseInt(el.getAttribute('data-index') || '0');
    const field = el.getAttribute('data-field') as 'icon' | 'title' | 'description';
    if (content.advantages[index]) {
      if (field === 'description') {
        content.advantages[index][field] = (el as HTMLTextAreaElement).value;
      } else {
        content.advantages[index][field] = (el as HTMLInputElement).value;
      }
    }
  });
  saveAdminContent(content);
  alert('保存成功！');
};

// 保存联系我们
(window as any).saveContactContent = function (): void {
  const content = getAdminContent();
  content.contact = {
    title: (document.getElementById('edit-contact-title') as HTMLInputElement).value,
    description: (document.getElementById('edit-contact-description') as HTMLTextAreaElement).value,
    address: (document.getElementById('edit-contact-address') as HTMLInputElement).value,
    phone: (document.getElementById('edit-contact-phone') as HTMLInputElement).value,
    email: (document.getElementById('edit-contact-email') as HTMLInputElement).value,
  };
  saveAdminContent(content);
  alert('保存成功！');
};

// 重置内容
(window as any).resetContent = function (): void {
  saveAdminContent(defaultAdminContent);
  alert('已重置为默认内容！');
  renderAdminDashboard();
};

// 退出登录
window.adminLogout = function (): void {
  setAdminLoggedIn(false);
  window.closeAdmin();
};

// 打开管理员后台
window.openAdmin = function (): void {
  if (isAdminLoggedIn()) {
    renderAdminDashboard();
  } else {
    renderAdminLogin();
  }
};

// 管理员页面样式
const adminStyles = `
  .admin-login-page,
  .admin-dashboard {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    padding: 40px 20px;
  }
  
  .admin-login-card {
    max-width: 400px;
    margin: 60px auto;
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .login-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .login-header h1 {
    font-size: 24px;
    color: #1a1a2e;
    margin-bottom: 8px;
  }
  
  .login-header p {
    color: #666;
    font-size: 14px;
  }
  
  .login-form .form-group {
    margin-bottom: 20px;
  }
  
  .login-form label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }
  
  .login-form input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
  }
  
  .login-form input:focus {
    outline: none;
    border-color: #c9a227;
  }
  
  .login-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #c9a227, #d4af37);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 162, 39, 0.4);
  }
  
  .login-hint {
    margin-top: 20px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    text-align: center;
  }
  
  .login-hint p {
    color: #666;
    font-size: 12px;
    margin: 0;
  }
  
  .back-btn {
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    background: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .back-btn:hover {
    background: #e0e0e0;
  }
  
  /* Dashboard */
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 24px 32px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .admin-header h1 {
    font-size: 24px;
    color: #1a1a2e;
    margin: 0 0 4px 0;
  }
  
  .admin-header p {
    color: #666;
    margin: 0;
    font-size: 14px;
  }
  
  .admin-logout-btn {
    padding: 10px 24px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .admin-logout-btn:hover {
    background: #c82333;
  }
  
  .admin-tabs {
    display: flex;
    gap: 8px;
    background: white;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    overflow-x: auto;
  }
  
  .tab-btn {
    padding: 10px 20px;
    background: #f0f0f0;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  
  .tab-btn.active {
    background: linear-gradient(135deg, #c9a227, #d4af37);
    color: white;
  }
  
  .tab-btn:hover:not(.active) {
    background: #e0e0e0;
  }
  
  .admin-content {
    background: white;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .tab-panel {
    display: none;
  }
  
  .tab-panel.active {
    display: block;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }
  
  .panel-header h2 {
    font-size: 20px;
    color: #1a1a2e;
    margin: 0;
  }
  
  .save-btn {
    padding: 10px 24px;
    background: linear-gradient(135deg, #28a745, #34ce57);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  }
  
  .edit-form .form-group {
    margin-bottom: 20px;
  }
  
  .edit-form label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
  }
  
  .edit-form input,
  .edit-form textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
  
  .edit-form input:focus,
  .edit-form textarea:focus {
    outline: none;
    border-color: #c9a227;
  }
  
  .edit-form textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .stat-item-edit,
  .service-item-edit,
  .adv-item-edit {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .admin-footer {
    display: flex;
    gap: 16px;
    margin-top: 24px;
  }
  
  .reset-btn {
    flex: 1;
    padding: 12px;
    background: #ffc107;
    color: #333;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .reset-btn:hover {
    background: #e0a800;
  }
  
  @media (max-width: 768px) {
    .admin-header {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
    
    .admin-tabs {
      flex-wrap: wrap;
    }
    
    .admin-content {
      padding: 20px;
    }
  }
`;

// 注入样式
const adminStyleEl = document.createElement('style');
adminStyleEl.textContent = adminStyles;
document.head.appendChild(adminStyleEl);
