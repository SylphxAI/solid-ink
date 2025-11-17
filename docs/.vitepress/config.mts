import { defineConfig } from 'vitepress';

// @ts-check
export default defineConfig({
  title: 'Solid-TUI',
  description: 'SolidJS renderer for terminal/CLI applications',
  base: '/',
  ignoreDeadLinks: true,

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
            { text: 'What is Solid-TUI?', link: '/guide/what-is-solid-tui' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Why Solid-TUI?', link: '/guide/why-solid-tui' },
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
            { text: 'Testing', link: '/guide/testing' },
            { text: 'Best Practices', link: '/guide/best-practices' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Core',
          items: [
            { text: 'Components', link: '/api/core/components' },
            { text: 'Hooks', link: '/api/core/hooks' },
            { text: 'Utilities', link: '/api/core/utilities' },
          ],
        },
        {
          text: 'Input Components',
          items: [
            { text: 'Overview', link: '/api/inputs/' },
            { text: 'TextInput', link: '/api/inputs/text-input' },
            { text: 'SelectInput', link: '/api/inputs/select-input' },
            { text: 'MultiSelect', link: '/api/inputs/multi-select' },
            { text: 'ConfirmInput', link: '/api/inputs/confirm-input' },
            { text: 'QuickSearchInput', link: '/api/inputs/quick-search' },
          ],
        },
        {
          text: 'UI Components',
          items: [
            { text: 'Overview', link: '/api/components/' },
            { text: 'ProgressBar', link: '/api/components/progress-bar' },
            { text: 'Table', link: '/api/components/table' },
            { text: 'Divider', link: '/api/components/divider' },
            { text: 'Link', link: '/api/components/link' },
            { text: 'TitledBox', link: '/api/components/titled-box' },
          ],
        },
        {
          text: 'Markdown',
          items: [
            { text: 'Overview', link: '/api/markdown/' },
            { text: 'Markdown', link: '/api/markdown/markdown' },
            { text: 'SyntaxHighlight', link: '/api/markdown/syntax-highlight' },
          ],
        },
        {
          text: 'Visual Effects',
          items: [
            { text: 'Overview', link: '/api/visual/' },
            { text: 'Gradient', link: '/api/visual/gradient' },
            { text: 'BigText', link: '/api/visual/big-text' },
            { text: 'Chart', link: '/api/visual/chart' },
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
      { icon: 'github', link: 'https://github.com/SylphxAI/solid-tui' },
      { icon: 'x', link: 'https://x.com/SylphxAI' },
      { icon: 'npm', link: 'https://www.npmjs.com/search?q=%40sylphx%2Fsolid-tui' },
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
