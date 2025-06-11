import { defineConfig } from 'vitepress'
import timeline from "vitepress-markdown-timeline";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/hkh-trading/',
  title: "HKH-trading",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/201508876PMH/hkt/76a7fa0ad22fa17e0e1f73a21675e8d4f13939bf/docs/images/stock-up.svg' }]],
  description: "Automate crypto pair trading",
  lastUpdated: true,
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present HKH Trading'
    },
    logo: 'https://raw.githubusercontent.com/201508876PMH/hkt/76a7fa0ad22fa17e0e1f73a21675e8d4f13939bf/docs/images/stock-up.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: 'Trading',
        items: [
          { text: 'FTMO Challenge', link: '/ftmo/purpose' },
          { text: 'Performance', link: '/performance/performance' },
          { text: 'Journal', link: '/journal/journal' }
        ]
      },
      { text: 'Goals & Roadmap', link: '/goals/goals' },
    ],
    sidebar: {
       '/ftmo/': [
      {
        text: 'FTMO Challenge',
        items: [
          { text: 'Purpose', link: '/ftmo/purpose' }
        ]
      }
    ],
      '/performance/': [
      {
        text: 'Performance',
        items: [
          { text: 'Performance', link: '/performance/performance' }
        ]
      }
    ],
     '/journal/': [
      {
        text: 'Journal',
        items: [
          { text: 'Journal', link: '/journal/journal' }
        ]
      }
    ],
    },

    socialLinks: [
      { icon: 'x', link: 'https://x.com/HansHoveling' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(timeline);
    }
  }
});
