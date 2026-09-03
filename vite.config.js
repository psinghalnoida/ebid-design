import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Dev proxy: the CI4 backend serves both /api/v1/* and a set of
// non-/api routes (tender, chronicles, browse, discovery, invoices,
// legal/info content), so each prefix is forwarded explicitly.
const BACKEND_PREFIXES = [
  '/api',
  '/browse',
  '/listings',
  '/sale-events',
  '/tender-view',
  '/tender-reviews',
  '/chronicles',
  '/chronicle',
  '/my-favorites',
  '/my-searches',
  '/my-listings',
  '/search-history',
  '/recommendations',
  '/ticker-feed',
  '/account/invoices',
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_PROXY_TARGET || 'http://localhost:8080';
  const proxy = Object.fromEntries(
    BACKEND_PREFIXES.map((p) => [p, { target, changeOrigin: true }])
  );

  return {
    plugins: [react()],
    server: { port: 5173, proxy },
    build: { outDir: 'dist' },
  };
});
