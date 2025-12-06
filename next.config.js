/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为 Cloudflare Pages 配置静态导出
  output: 'export',
  
  // 禁用服务器端渲染和增量静态再生
  trailingSlash: true,
  
  // 配置图像优化
  images: {
    unoptimized: true, // Cloudflare Pages 需要禁用图像优化
  },
  
  // 配置 Webpack 以处理可能的模块解析问题
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
};

module.exports = nextConfig;