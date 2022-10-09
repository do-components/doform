import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue2(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/bundle.js'),
      name: 'Doform',
      fileName: format => `doform.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // assetFileNames: assetInfo => {
        //   if (assetInfo.name === 'style.css') return 'custom.css'
        //   return assetInfo.name
        // },
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
