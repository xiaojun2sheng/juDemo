import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 在这里添加自定义的Less配置
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    vue()
  ],
})
