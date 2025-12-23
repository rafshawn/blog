import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Braindump",
  description: "My learning shit",
  srcDir: "",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-frappe',
    },
  },
})
