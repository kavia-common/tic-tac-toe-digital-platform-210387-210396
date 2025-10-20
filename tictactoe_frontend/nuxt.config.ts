/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Tic-Tac-Toe | Ocean Professional',
      meta: [
        { name: 'description', content: 'Play Tic-Tac-Toe in a modern Ocean Professional theme.' }
      ],
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
  // Expose public directory for theme assets
  dir: {
    public: 'public'
  },
});
