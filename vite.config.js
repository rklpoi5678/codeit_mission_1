import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /* eslint-disable */ 
      '@': path.resolve(__dirname, './src'), // '@/components' 와 같이 사용할 때 'src' 폴더를 가리키게 됩니다.
    },
   },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        items: resolve(__dirname, 'src/pages/items/items.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        signup: resolve(__dirname, 'src/pages/signup.html')
      }
    }
  }
});
