import { defineConfig } from 'vitepress'
import timeline from "vitepress-markdown-timeline";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/hkh-trading/',
  title: "HKH-trading",
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/201508876PMH/hkh-trading/c6185e8487a39cc7c98887f82b91aa7318d933b3/docs/images/stock-up.svg' }]],
  description: "HKH Forex trading",
  lastUpdated: true,
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present HKH Trading'
    },
    logo: 'https://raw.githubusercontent.com/201508876PMH/hkh-trading/c6185e8487a39cc7c98887f82b91aa7318d933b3/docs/images/stock-up.svg',
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
          { text: 'Journal', link: '/journal/2025/journal' }
        ]
      },
      { text: 'Goals & Milestones', link: '/goals/goals' },
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
        text: 'Trading Journal',
        items: [
          { 
            text: '2025',
            items: [
              { text: 'Journal', link: '/journal/2025/journal' },
              { text: 'Overview', link: '/journal/2025/overview' },
            ]
          }
        ]
      },
    ],
     '/goals/': [
      {
        text: 'Goals & Milestones',
        items: [
          { text: 'Goals', link: '/goals/goals' },
          { text: 'Milestones', link: '/goals/milestones' }
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
