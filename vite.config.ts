
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Загружаем переменные из .env файла в корневой папке
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Передаем API_KEY в код приложения
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
