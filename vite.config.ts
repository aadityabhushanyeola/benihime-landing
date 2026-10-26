import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const siteUrl = (process.env.VITE_SITE_URL || 'https://benihime.co.in/').replace(/\/?$/, '/');
export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE || '/',
  plugins: [react(), {
    name: 'benihime-social-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
  }],
});
