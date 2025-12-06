import './globals.css'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { LanguageProvider } from '../contexts/LanguageContext';

export const metadata = {
  title: '哪吒面板工具',
  description: '快速生成哪吒监控面板的JSON配置文件',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <LanguageProvider>
          {/* 科技风背景 */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-700"></div>
            <div className="absolute inset-0">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-primary-400/20 to-indigo-400/20 dark:from-primary-600/10 dark:to-indigo-600/10 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-l from-secondary-400/20 to-pink-400/20 dark:from-secondary-600/10 dark:to-pink-600/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-purple-400/20 to-blue-400/20 dark:from-purple-600/10 dark:to-blue-600/10 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'%2394a3b8\' fill-opacity=\'0.07\'/%3E%3C/svg%3E')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
          </div>

          {/* 导航栏 */}
          <Navigation />

          {/* 主内容 */}
          <main className="min-h-screen pb-12 flex flex-col">
            {children}
          </main>

          {/* 页脚 */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
