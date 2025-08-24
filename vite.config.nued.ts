import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NuedUI',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    },
    outDir: 'dist',
    sourcemap: true
  },
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: path.resolve(__dirname, 'tsconfig.lib.json'),
      exclude: [
        'app/**/*',
        'playground/**/*',
        'server/**/*',
        '.nuxt/**/*',
        'node_modules/**/*',
        'nuxt.config.*',
        'vite.config.*'
      ]
    }),
  ],
  resolve: {
    alias: {
      '@nued': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src'),
      '~~': path.resolve(__dirname, '.'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      }
    }
  },
  optimizeDeps: {
    exclude: ['#app']
  }
})