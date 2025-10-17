// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  compatibilityDate: "2024-07-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint"],
  css: ["~/assets/css/main.css"],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  app: {
    head: {
      title: "Movie List",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Movie List - Built with Nuxt, TanStack Query, and Tailwind",
        },
      ],
    },
  },
});
