import { defineConfig } from 'vitepress'
import { optimizeImages } from 'vitepress-plugin-image-optimize'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/braindump/',
  title: "Braindump",
  description: "My learning shit",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-frappe',
    },
    math: true,
    image: {
      lazyLoading: true,
    },
    // config: (md) => {
    //   md.use(optimizeImages({
    //     srcDir: "",
    //     quality: 10,
    //     lazyLoading: true,
    //   }))
    // }
  },
  themeConfig: {
    nav: [
      { text: 'Core', link: '/core-learning/core' },
    ],
    sidebar: [
      {
        text: 'SUBJECTS',
        collapsed: false,
        items: [
          {
            text: 'Real-Time Operating Systems',
            collapsed: true,
            items: [
              { text: '0. Introduction', link: '/core-learning/rtos/00-Introduction' },
              { text: '2. Processes', link: '/core-learning/rtos/02-Processes' },
              { text: '3. File Abstractions', link: '/core-learning/rtos/03-File-Abstractions' },
              { text: '4. Process Control', link: '/core-learning/rtos/04-Process-Control' },
              { text: '5. Memory Allocation', link: '/core-learning/rtos/05-Memory-Allocation' },
              { text: '6. Shells', link: '/core-learning/rtos/06-Shells' },
              { text: '7. Inter-Process Communication', link: '/core-learning/rtos/07-Inter-Process-Communication' },
              { text: '8. Init-Systems', link: '/core-learning/rtos/08-Init-Systems' },
              { text: '9. Kernel Architecture and Interrupts', link: '/core-learning/rtos/09-Kernel-Architecture-and-Interrupts' },
              { text: '10. Process Models and Scheduling', link: '/core-learning/rtos/10-Process-Models-and-Scheduling' },
              { text: '11. Scheduling', link: '/core-learning/rtos/11-Scheduling' },
              { text: '12. Scheduling Algorithms', link: '/core-learning/rtos/12-Scheduling-Algorithms' },
              { text: '13. Memory Management', link: '/core-learning/rtos/13-Memory-Management' },
              { text: '14. Page Tables', link: '/core-learning/rtos/14-Page-Tables' },
              { text: '15. Page Faults', link: '/core-learning/rtos/15-Page-Faults' },
              { text: '16. Filesystems', link: '/core-learning/rtos/16-Filesystems' },
              { text: '17. File Permissions', link: '/core-learning/rtos/17-File-Permissions' },
              { text: '18. FAT Filesystems', link: '/core-learning/rtos/18-FAT-Filesystems' },
              { text: '19. CoW Filesystems', link: '/core-learning/rtos/19-CoW-Filesystems' },
              { text: '20. Network Filesystems', link: '/core-learning/rtos/20-Network-Filesystems' },
              { text: '21. I/O History', link: '/core-learning/rtos/21-IO-History' },
              { text: '22. I/O Buffering', link: '/core-learning/rtos/22-IO-Buffering' },
              { text: '23. Real-Time Scheduling', link: '/core-learning/rtos/23-Real-Time-Scheduling' },
              { text: '24. Priority Inversion', link: '/core-learning/rtos/24-Priority-Inversion' },
            ]
          },
        ]
      }
    ],
    search: {
      provider: 'local',
    }
  },
  rewrites: {
    'README.md': 'index.md',
  },
  lastUpdated: true,
})