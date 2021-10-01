import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path');
import styleImport from 'vite-plugin-style-import';
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/images': 'src/assets/images',
      'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 傳入共用的全域變數scss
        additionalData: `
        @import "@/assets/scss/_color.scss";
        `,
      },
      // ant-design customize theme
      less: {
        // 改 ant design 主題色
        modifyVars: {
          'primary-color': '#0488C5',
          'font-family': 'Roboto',
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        }
      ]
    }),
    new AntdDayjsWebpackPlugin()
  ]
})
