// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxt/icon"],
  googleFonts: {
    families: {
      "Open+Sans": "400..800",
    },
  },
});