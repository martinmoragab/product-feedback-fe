import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
	resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@images': path.resolve(__dirname, './src/assets/images'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services')
    },
  },
  plugins: [vue()]
})
