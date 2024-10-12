import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['crypto-js'], // 显式引入需要预打包的依赖
  },
  base:'./'
})
