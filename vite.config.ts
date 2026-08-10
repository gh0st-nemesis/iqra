import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: "Iqra' — Apprendre l'arabe et l'islam",
        short_name: "Iqra'",
        description: "Apprendre l'arabe et l'islam pas à pas : alphabet, lecture, Coran, prière, adhkar et bien plus",
        lang: 'fr',
        start_url: '/',
        display: 'standalone',
        background_color: '#fdf6e9',
        theme_color: '#0f766e',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pré-cache le shell de l'app (JS/CSS/HTML) pour un fonctionnement hors-ligne des modules
        // statiques (alphabet, chiffres, harakat, lecture, vocabulaire, tajwîd, ablutions, salat,
        // noms d'Allah, prophètes, adhkar, connaissances).
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            // Polices Google Fonts déjà chargées.
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Métadonnées et texte des sourates (alquran.cloud) : réseau d'abord, cache en secours.
            urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'quran-api',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fichiers audio des récitations (CDN islamic.network) : immuables une fois publiés,
            // donc cache d'abord — un verset déjà écouté reste dispo hors-ligne.
            urlPattern: /^https:\/\/cdn\.islamic\.network\/quran\/audio.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quran-audio',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
