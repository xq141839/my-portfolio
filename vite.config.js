import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 关键配置：这里必须填写你的 GitHub 仓库名称
  // 例如，如果你的仓库地址是 https://github.com/san-zhang/academic-site
  // 那么这里就填 '/academic-site/'
  // 如果你是部署到 https://san-zhang.github.io/ (根域名)，则填 '/'
  base: '/my-portfolio/', 
})
