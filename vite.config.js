import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import optimizer from 'vite-plugin-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    optimizer({
      child_process: () => ({
        find: /^(node:)?child_process$/,
        code: `const child_process = import.meta.glob('child_process'); export { child_process as default }`
      })
    })
  ],
  server: {
    proxy: {
      '/apiSer': {
        target: 'http://127.0.0.1:8248/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/apiSer/, '')
      }
    }
  },
})
