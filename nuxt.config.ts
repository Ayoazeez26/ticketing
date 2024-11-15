// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  googleFonts: {
    families: {
      "Open+Sans": "400..800",
    },
  },

  css: ["~/assets/main.scss"],

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL,
      eventID: process.env.EVENT_ID,
      pk_key: process.env.PAYSTACK_API_KEY,
      recaptcha_key: process.env.RECAPTCHA_SITE_KEY,
    },
  },
});
