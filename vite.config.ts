import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'
import styleImport from 'vite-plugin-style-import';
import typescript from '@rollup/plugin-typescript';

const { resolve } = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'xy-cloud-kit-2',
      fileName: (format) => `xy-cloud-kit-2.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        sourcemap: true,
        dir: ('dist'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
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
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        },
      ],
    }),
    typescript({
      target: 'esnext',
      rootDir: 'src',
      declaration: true,
      declarationDir: 'dist',
      exclude: 'node_modules/**',
      allowSyntheticDefaultImports: true,
    }),
  ],
});
