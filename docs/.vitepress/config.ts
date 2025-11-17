import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Solid-Ink',
  description: 'SolidJS renderer for terminal/CLI applications',
  base: '/',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/components' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Benchmark', link: '/benchmark' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Solid-Ink?', link: '/guide/what-is-solid-ink' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Why Solid-Ink?', link: '/guide/why-solid-ink' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Fine-grained Reactivity', link: '/guide/reactivity' },
            { text: 'Layout System', link: '/guide/layout' },
            { text: 'Styling', link: '/guide/styling' },
            { text: 'User Input', link: '/guide/input' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Performance', link: '/guide/performance' },
            { text: 'Best Practices', link: '/guide/best-practices' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components', link: '/api/components' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Utilities', link: '/api/utilities' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Counter', link: '/examples/counter' },
            { text: 'Interactive List', link: '/examples/interactive-list' },
            { text: 'Dashboard', link: '/examples/dashboard' },
            { text: 'Forms', link: '/examples/forms' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SylphxAI/solid-ink' },
      { icon: 'twitter', link: 'https://x.com/SylphxAI' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 SylphX',
    },

    search: {
      provider: 'local',
    },
  },
});
