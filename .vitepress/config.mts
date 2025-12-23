import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Braindump",
  description: "My learning shit",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-frappe',
    },
  },
  rewrites: {
    'README.md': 'index.md',
  },
})
