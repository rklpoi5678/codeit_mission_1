import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /* eslint-disable */ 
      '@': path.resolve(__dirname, './src'), // '@/components' 와 같이 사용할 때 'src' 폴더를 가리키게 됩니다.
    },
   },
});
