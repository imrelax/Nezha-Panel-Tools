# Nezha JSON Tools

一个现代化的 JSON 配置生成工具，专为 Nezha 监控系统设计，提供直观的用户界面来生成和管理 JSON 配置文件。

## 🚀 系统功能

### 核心功能
- **JSON 配置生成**：可视化界面生成 Nezha 监控系统的 JSON 配置文件
- **账单配置管理**：设置服务器计费信息，包括开始/结束日期、计费周期、金额和自动续费
- **计划配置管理**：配置服务器规格，包括带宽、流量、网络线路类型和自定义标签
- **实时预览**：配置修改即时反映在 JSON 输出中，支持一键复制
- **多语言支持**：支持中英文界面切换
- **主题切换**：支持浅色/深色主题自动切换
- **本地存储**：自动保存用户配置，刷新页面不丢失数据

### 扩展功能
- **流量监控**：配置流量监控规则和告警阈值
- **告警配置**：设置各种监控指标的告警规则
- **服务IP查询**：查询和管理服务器IP地址信息

## 🛠️ 技术栈与工具

### 前端技术
- **Next.js 14**：React 全栈框架，支持 App Router
- **React 18**：现代化的用户界面库
- **Tailwind CSS**：实用优先的 CSS 框架，提供一致的设计系统
- **TypeScript**：类型安全的 JavaScript 超集

### 开发工具
- **Node.js**：JavaScript 运行时环境
- **Git**：版本控制系统
- **VS Code / Trae AI**：代码编辑器和开发环境

### AI 模型支持
本项目在开发过程中使用了以下 AI 模型和工具：

- **Claude 4 Sonnet**：代码生成、优化和调试
- **Trae AI IDE**：智能代码补全和重构
- **AI 辅助功能**：
  - 代码架构设计和优化
  - 多语言国际化支持
  - 用户界面设计改进
  - 错误处理和调试
  - 代码质量提升和最佳实践应用

## 📁 项目结构

```
NezhaJSONTools/
├── src/
│   ├── app/               # Next.js App Router 页面
│   │   ├── page.jsx       # 首页 - 账单配置
│   │   ├── traffic/       # 流量监控页面
│   │   ├── alert/         # 告警配置页面
│   │   ├── service/       # 服务IP查询页面
│   │   ├── beautify/      # 美化配置页面
│   │   └── layout.jsx     # 根布局
│   ├── components/        # React 组件
│   │   ├── ConfigLayout.jsx
│   │   ├── GlassCard.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── contexts/          # React Context
│   │   └── LanguageContext.jsx
│   └── lib/
│       └── i18n/          # 多语言包
│           ├── en.js
│           └── zh.js
├── public/                # 静态资源
│   └── config/
│       └── ip.json        # IP地址配置数据
├── .github/workflows/     # GitHub Actions 工作流
│   └── deploy.yml        # Cloudflare Pages 部署配置
├── functions/            # Cloudflare Functions
│   └── _redirects        # 重定向配置
├── next.config.js        # Next.js 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── README.md             # 项目文档
```

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome 88+, Firefox 85+, Safari 14+, Edge 88+）
- Python 3.x（用于本地服务器）

### 安装和运行

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/NezhaJSONTools.git
   cd NezhaJSONTools
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问：http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

### 部署到 Cloudflare Pages

1. **配置环境变量**：
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API 令牌
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID

2. **自动部署**：推送到 main 分支将自动触发部署

3. **手动部署**：
   ```bash
   npm run build
   npx wrangler pages deploy ./out
   ```

## 📖 使用指南

1. **启用功能模块**：勾选需要的配置模块（账单配置/计划配置）
2. **填写配置信息**：根据界面提示填写相关配置参数
3. **实时预览**：右侧面板实时显示生成的 JSON 配置
4. **复制配置**：点击复制按钮获取生成的 JSON 配置代码

## 🌟 特色亮点

- **现代化技术栈**：使用 Next.js 14 + React 18 + TypeScript
- **响应式设计**：完美适配各种设备屏幕
- **多语言支持**：完整的中英文国际化支持
- **AI 驱动开发**：利用先进 AI 模型优化用户体验
- **模块化架构**：代码结构清晰，易于维护和扩展
- **安全可靠**：所有数据处理在本地完成，保护用户隐私
- **云原生部署**：支持 Cloudflare Pages 一键部署，全球 CDN 加速

## 🚀 Cloudflare Pages 部署优势

- **全球加速**：利用 Cloudflare 全球网络，快速访问
- **自动部署**：Cloudflare Pages 自动构建和部署
- **完全免费**：Cloudflare Pages 提供免费的托管服务
- **高可用性**：自动故障转移和负载均衡
- **SSL 证书**：自动 HTTPS 加密
- **自定义域名**：支持绑定自己的域名

## 📊 性能特性

- **静态导出**：所有页面预渲染，加载速度快
- **代码分割**：自动代码分割，优化加载性能
- **图片优化**：自动 WebP 格式转换和尺寸优化
- **SEO 友好**：服务端渲染，搜索引擎优化
- **PWA 支持**：可安装为桌面应用

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Nezha JSON Tools** - 让 Nezha 监控配置更简单！
