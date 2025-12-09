
import { defineConfig } from 'vite';

export default defineConfig({

  
  server: {
  
    open: '/pages/loading.html' 
  },
  

  build: {
    rollupOptions: {
      input: {
        loading: '/pages/loading.html',
        main: 'index.html',
      }
    }
  }
});