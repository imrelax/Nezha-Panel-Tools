export default {
  async fetch(request, env, ctx) {
    try {
      // 设置 Node.js 兼容性标志
      const response = await env.ASSETS.fetch(request);
      
      // 复制响应以便我们可以修改 headers
      const newResponse = new Response(response.body, response);
      
      // 添加必要的 headers
      newResponse.headers.set('X-Cloudflare-Worker-Compatibility-Flags', 'nodejs_compat');
      
      return newResponse;
    } catch (e) {
      return new Response('Error: ' + e.message, { status: 500 });
    }
  }
};