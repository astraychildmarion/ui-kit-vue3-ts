import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import dts from 'vite-plugin-dts';

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      name: 'xy-cloud-kit-2',
      fileName: (format) => `xy-cloud-kit-2.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'ant-design-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        dir: 'dist',
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
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
    dts(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        },
      ],
    }),
  ],
  server: {
    port: 6010
  }
});
