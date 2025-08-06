# Nezha Panel Tools

一个现代化的 JSON 配置生成工具，专为 Nezha 监控系统设计，提供直观的用户界面来生成和管理 JSON 配置文件。

## ✨ 项目特色

### 🎨 现代化设计
- **响应式布局**：完美适配桌面、平板和移动设备
- **深色模式支持**：自动检测系统主题偏好，支持手动切换
- **流畅动画**：精心设计的过渡效果和交互反馈
- **无障碍设计**：遵循 WCAG 2.1 标准，支持键盘导航和屏幕阅读器

### 🚀 核心功能
- **实时预览**：配置修改即时反映在 JSON 输出中
- **智能验证**：输入数据自动验证，防止配置错误
- **一键复制**：支持一键复制生成的 JSON 配置
- **本地存储**：自动保存用户配置，刷新页面不丢失数据
- **多语言支持**：支持中英文界面切换

### 🛠️ 技术架构
- **原生 JavaScript**：无框架依赖，轻量高效
- **模块化设计**：代码结构清晰，易于维护和扩展
- **现代 CSS**：使用 Tailwind CSS 构建，支持自定义主题
- **渐进式增强**：核心功能在所有现代浏览器中正常工作

## 📁 项目结构

```
Nezha-Panel-Tools/
├── index.html              # 主页面 - JSON 配置生成器
├── traffic.html            # 流量监控页面
├── alert.html              # 告警配置页面
├── service.html            # 服务IP查询页面
├── js/
│   ├── components/
│   │   ├── shared-components.js # 共享组件（导航、页脚、模态框等）
│   │   └── theme.js            # 主题和多语言配置
│   ├── core/
│   │   ├── core.js             # 核心模块（配置、工具函数、事件管理）
│   │   └── polyfills.js        # 浏览器兼容性检查
│   ├── pages/
│   │   ├── app.js              # 主页面逻辑
│   │   ├── traffic.js          # 流量监控页面逻辑
│   │   ├── alert.js            # 告警页面逻辑
│   │   └── service.js          # 服务页面逻辑
│   └── utils.js                # 工具函数和表单处理
├── config/
│   └── ip.json                 # IP地址配置数据
└── README.md                   # 项目文档
```

## 🚀 快速开始

### 环境要求
- 现代浏览器（Chrome 88+, Firefox 85+, Safari 14+, Edge 88+）
- 本地 HTTP 服务器（用于开发）

### 安装和运行

1. **克隆项目**
   ```bash
   git clone https://github.com/imrelax/Nezha-Panel-Tools.git
   cd Nezha-Panel-Tools
   ```

2. **启动本地服务器**
   
   使用 Python（推荐）：
   ```bash
   python3 -m http.server 8000
   ```
   
   或使用 Node.js：
   ```bash
   npx serve .
   ```
   
   或使用 PHP：
   ```bash
   php -S localhost:8000
   ```

3. **访问应用**
   
   打开浏览器访问：http://localhost:8000

## 📖 使用指南

### 基础配置

1. **启用功能模块**
   - 勾选"启用账单配置"来配置计费信息
   - 勾选"启用计划配置"来设置服务器规格

2. **账单配置**
   - 设置开始和结束日期
   - 选择计费周期（日/周/月/季/半年/年等）
   - 配置金额和货币格式
   - 设置自动续费选项

3. **计划配置**
   - 配置带宽限制和单位
   - 设置流量配额和计费周期
   - 选择网络路由类型
   - 添加自定义标签

### 高级功能

- **标签管理**：添加多个自定义标签来标识服务器特性
- **实时预览**：右侧面板实时显示生成的 JSON 配置
- **一键复制**：点击复制按钮快速获取配置代码
- **主题切换**：支持浅色/深色主题自动切换
- **流量监控**：配置流量监控规则和告警阈值
- **告警配置**：设置各种监控指标的告警规则

## 🔧 开发指南

### 代码架构

项目采用模块化架构，主要模块包括：

- **core.js**：核心功能模块，包含全局状态管理、工具函数和事件系统
- **shared-components.js**：可复用的 UI 组件
- **theme.js**：统一的主题和多语言配置系统
- **utils.js**：表单处理和工具函数

### 样式系统

项目使用 Tailwind CSS 作为基础样式框架，并通过组件系统提供统一的样式配置：

```javascript
// 使用预定义样式类
const inputClass = getStyleClass('input', 'base');
const buttonClass = getStyleClass('button', 'primary');
```

### 事件系统

使用全局事件管理器处理组件间通信：

```javascript
// 监听事件
eventManager.on('configUpdated', (data) => {
    console.log('配置已更新:', data);
});

// 触发事件
eventManager.emit('configUpdated', { type: 'billing' });
```

### 添加新功能

1. 在相应的模块文件中添加功能函数
2. 更新 HTML 模板（如需要）
3. 在样式配置中添加样式类（如需要）
4. 使用事件系统处理组件间通信

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|--------|----------|------|
| Chrome | 88+ | ✅ 完全支持 |
| Firefox | 85+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 88+ | ✅ 完全支持 |
| Opera | 74+ | ✅ 完全支持 |

## 🔒 安全可靠

- **纯前端应用**：所有数据处理在本地完成，无需担心隐私泄露
- **无外部依赖**：除 Tailwind CSS 外无其他外部库依赖
- **输入验证**：严格的输入验证防止恶意数据
- **CSP 兼容**：支持内容安全策略，提高安全性

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范

- 使用 ES6+ 语法
- 遵循 JSDoc 注释规范
- 保持代码简洁和可读性
- 添加适当的错误处理

## 📞 联系我们

- 项目主页：[GitHub Repository](https://github.com/imrelax/Nezha-Panel-Tools)
- 问题反馈：[Issues](https://github.com/imrelax/Nezha-Panel-Tools/issues)
- 功能建议：[Discussions](https://github.com/imrelax/Nezha-Panel-Tools/discussions)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看 LICENSE 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**Nezha Panel Tools** - 让 Nezha 监控配置更简单！
